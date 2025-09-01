"""
Job service for managing translation jobs
"""
import hashlib
from typing import List, Optional, Tuple
from uuid import UUID
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_

from ..models.job import Job, JobStatus
from ..schemas.job import JobCreate


class JobService:
    def __init__(self, db: Session):
        self.db = db
    
    async def create_job(self, job_data: JobCreate) -> Job:
        """Create a new translation job"""
        
        # Generate a spec hash for idempotency
        spec_string = f"{job_data.filename}:{job_data.source_language}:{job_data.target_language}:{str(job_data.options)}"
        spec_hash = hashlib.sha256(spec_string.encode()).hexdigest()
        
        # Check if a similar job already exists
        existing_job = self.db.query(Job).filter(
            and_(
                Job.filename == job_data.filename,
                Job.source_language == job_data.source_language,
                Job.target_language == job_data.target_language,
                Job.status.in_([JobStatus.PENDING, JobStatus.UPLOADING, JobStatus.UPLOADED])
            )
        ).first()
        
        if existing_job:
            return existing_job
        
        # Create new job
        job = Job(
            filename=job_data.filename,
            file_size=job_data.file_size,
            source_language=job_data.source_language,
            target_language=job_data.target_language,
            options=job_data.options or {},
            status=JobStatus.PENDING
        )
        
        self.db.add(job)
        self.db.commit()
        self.db.refresh(job)
        
        return job
    
    async def get_job(self, job_id: UUID) -> Optional[Job]:
        """Get a job by ID"""
        return self.db.query(Job).filter(Job.id == job_id).first()
    
    async def list_jobs(
        self, 
        skip: int = 0, 
        limit: int = 10, 
        status: Optional[JobStatus] = None
    ) -> Tuple[List[Job], int]:
        """List jobs with pagination"""
        query = self.db.query(Job)
        
        if status:
            query = query.filter(Job.status == status)
        
        total = query.count()
        jobs = query.order_by(Job.created_at.desc()).offset(skip).limit(limit).all()
        
        return jobs, total
    
    async def update_job_status(
        self, 
        job: Job, 
        status: JobStatus, 
        progress_percent: Optional[float] = None,
        current_stage: Optional[str] = None,
        current_page: Optional[int] = None,
        total_pages: Optional[int] = None,
        error_message: Optional[str] = None
    ) -> Job:
        """Update job status and progress"""
        job.status = status
        
        if progress_percent is not None:
            job.progress_percent = progress_percent
        
        if current_stage is not None:
            job.current_stage = current_stage
            
        if current_page is not None:
            job.current_page = current_page
            
        if total_pages is not None:
            job.total_pages = total_pages
            
        if error_message is not None:
            job.error_message = error_message
        
        if status == JobStatus.COMPLETED:
            job.completed_at = datetime.utcnow()
        elif status in [JobStatus.EXTRACTING, JobStatus.TRANSLATING]:
            if not job.started_at:
                job.started_at = datetime.utcnow()
        
        self.db.commit()
        self.db.refresh(job)
        
        return job
    
    async def queue_job(self, job: Job):
        """Queue job for processing"""
        # Update status to indicate job is queued
        await self.update_job_status(
            job, 
            JobStatus.UPLOADED, 
            progress_percent=0.0,
            current_stage="Queued for processing"
        )
        
        # For now, run the job in a background thread
        # In production, this would use Celery or similar task queue
        import threading
        from ..workers.translation_worker import run_translation_job_sync
        
        thread = threading.Thread(
            target=run_translation_job_sync,
            args=(str(job.id),),
            daemon=True
        )
        thread.start()
        
        return job
    
    async def cancel_job(self, job: Job):
        """Cancel a job"""
        await self.update_job_status(
            job,
            JobStatus.CANCELLED,
            current_stage="Cancelled by user"
        )
        
        # TODO: Send cancellation signal to worker if job is being processed
        
        return job
    
    async def delete_job(self, job: Job):
        """Delete a job and its associated data"""
        # TODO: Clean up associated files from storage
        
        # Delete job (this will cascade delete segments due to relationship)
        self.db.delete(job)
        self.db.commit()
        
        return True
