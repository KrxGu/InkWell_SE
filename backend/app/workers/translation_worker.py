"""
Background worker for processing translation jobs
"""
import os
import asyncio
from uuid import UUID
from sqlalchemy.orm import Session

from ..core.database import SessionLocal
from ..models.job import Job, JobStatus
from ..models.segment import Segment
from ..services.job_service import JobService
from ..services.pdf_processor import PDFProcessor, MockTranslationService
from ..core.config import settings


async def process_translation_job(job_id: str):
    """Process a translation job in the background"""
    
    # Create database session
    db = SessionLocal()
    
    try:
        # Get job service and load job
        job_service = JobService(db)
        job = await job_service.get_job(UUID(job_id))
        
        if not job:
            print(f"Job {job_id} not found")
            return
        
        if job.status != JobStatus.UPLOADED:
            print(f"Job {job_id} is not in UPLOADED status, current: {job.status}")
            return
        
        # Update job status to processing
        await job_service.update_job_status(
            job,
            JobStatus.EXTRACTING,
            progress_percent=0.0,
            current_stage="Starting PDF processing"
        )
        
        # Construct file path
        file_path = os.path.join(settings.upload_dir, job.options.get("file_key", "").replace("/", "_"))
        
        if not os.path.exists(file_path):
            await job_service.update_job_status(
                job,
                JobStatus.FAILED,
                error_message=f"File not found: {file_path}"
            )
            return
        
        # Initialize PDF processor
        pdf_processor = PDFProcessor(db)
        
        # Step 1: Process PDF and extract text
        try:
            processed_pages = await pdf_processor.process_pdf(job, file_path)
            
            # Update status
            await job_service.update_job_status(
                job,
                JobStatus.TRANSLATING,
                progress_percent=70.0,
                current_stage="Starting translation"
            )
            
        except Exception as e:
            await job_service.update_job_status(
                job,
                JobStatus.FAILED,
                error_message=f"PDF processing failed: {str(e)}"
            )
            return
        
        # Step 2: Translate text segments
        try:
            total_segments = sum(len(page.text_blocks) for page in processed_pages)
            translated_segments = 0
            
            for page in processed_pages:
                # Get text segments
                segments_text = [block.text for block in page.text_blocks]
                
                # Translate segments
                translations = await MockTranslationService.translate_segments(
                    segments_text,
                    job.source_language or "auto",
                    job.target_language
                )
                
                # Update segments in database
                page_segments = db.query(Segment).filter(
                    Segment.job_id == job.id,
                    Segment.page_number == page.page_number
                ).order_by(Segment.segment_index).all()
                
                for segment, translation in zip(page_segments, translations):
                    segment.translated_text = translation
                    segment.translation_method = "mock_mt"
                    segment.confidence_score = 0.95  # Mock confidence
                
                translated_segments += len(translations)
                
                # Update progress
                progress = 70.0 + (translated_segments / total_segments) * 20.0
                await job_service.update_job_status(
                    job,
                    JobStatus.TRANSLATING,
                    progress_percent=progress,
                    current_stage=f"Translated {translated_segments}/{total_segments} segments"
                )
            
            db.commit()
            
        except Exception as e:
            await job_service.update_job_status(
                job,
                JobStatus.FAILED,
                error_message=f"Translation failed: {str(e)}"
            )
            return
        
        # Step 3: Generate output PDF (mock for now)
        try:
            await job_service.update_job_status(
                job,
                JobStatus.BUILDING,
                progress_percent=90.0,
                current_stage="Building translated PDF"
            )
            
            # Mock output file creation
            output_filename = f"translated_{job.filename}"
            output_path = os.path.join(settings.upload_dir, f"{job.id}_{output_filename}")
            
            # For now, just copy the original file as a placeholder
            import shutil
            shutil.copy2(file_path, output_path)
            
            # Update job with download URL
            download_url = f"http://localhost:8000/api/v1/download/{job.id}"
            
            await job_service.update_job_status(
                job,
                JobStatus.COMPLETED,
                progress_percent=100.0,
                current_stage="Translation completed",
                download_url=download_url
            )
            
        except Exception as e:
            await job_service.update_job_status(
                job,
                JobStatus.FAILED,
                error_message=f"PDF generation failed: {str(e)}"
            )
            return
        
        print(f"Job {job_id} completed successfully")
        
    except Exception as e:
        print(f"Unexpected error processing job {job_id}: {e}")
        if job:
            await job_service.update_job_status(
                job,
                JobStatus.FAILED,
                error_message=f"Unexpected error: {str(e)}"
            )
    
    finally:
        db.close()


def run_translation_job_sync(job_id: str):
    """Synchronous wrapper for the async translation job"""
    asyncio.run(process_translation_job(job_id))
