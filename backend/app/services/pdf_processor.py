"""
PDF processing service for text extraction and layout analysis
"""
import os
import fitz  # PyMuPDF
import pikepdf
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass
from sqlalchemy.orm import Session

from ..models.job import Job, JobStatus
from ..models.segment import Segment
from .job_service import JobService


@dataclass
class TextBlock:
    """Represents a text block with position and content"""
    text: str
    bbox: Tuple[float, float, float, float]  # x0, y0, x1, y1
    font_name: str
    font_size: float
    font_flags: int
    page_number: int
    block_number: int


@dataclass
class ProcessedPage:
    """Represents a processed page with text blocks and background"""
    page_number: int
    text_blocks: List[TextBlock]
    background_content: Optional[bytes] = None
    width: float = 0
    height: float = 0


class PDFProcessor:
    """Main PDF processing service"""
    
    def __init__(self, db: Session):
        self.db = db
        self.job_service = JobService(db)
    
    async def process_pdf(self, job: Job, file_path: str) -> List[ProcessedPage]:
        """Process a PDF file and extract text with layout information"""
        
        # Update job status
        await self.job_service.update_job_status(
            job, 
            JobStatus.EXTRACTING,
            progress_percent=10.0,
            current_stage="Analyzing PDF structure"
        )
        
        # Open PDF document
        doc = fitz.open(file_path)
        total_pages = len(doc)
        
        # Update job with total pages
        await self.job_service.update_job_status(
            job,
            JobStatus.EXTRACTING,
            progress_percent=20.0,
            total_pages=total_pages,
            current_stage="Extracting text from pages"
        )
        
        processed_pages = []
        
        for page_num in range(total_pages):
            # Update progress
            progress = 20.0 + (page_num / total_pages) * 50.0
            await self.job_service.update_job_status(
                job,
                JobStatus.EXTRACTING,
                progress_percent=progress,
                current_page=page_num + 1,
                current_stage=f"Processing page {page_num + 1}"
            )
            
            # Process individual page
            page = doc[page_num]
            processed_page = await self._process_page(page, page_num)
            processed_pages.append(processed_page)
            
            # Save segments to database
            await self._save_page_segments(job, processed_page)
        
        doc.close()
        
        # Update job status
        await self.job_service.update_job_status(
            job,
            JobStatus.EXTRACTING,
            progress_percent=70.0,
            current_stage="Text extraction completed"
        )
        
        return processed_pages
    
    async def _process_page(self, page: fitz.Page, page_number: int) -> ProcessedPage:
        """Process a single page and extract text blocks"""
        
        # Get page dimensions
        rect = page.rect
        width, height = rect.width, rect.height
        
        # Extract text blocks with detailed information
        text_blocks = []
        
        # Get text as dictionary with detailed formatting information
        text_dict = page.get_text("dict")
        
        block_number = 0
        for block in text_dict["blocks"]:
            if "lines" in block:  # Text block
                for line in block["lines"]:
                    for span in line["spans"]:
                        if span["text"].strip():  # Only non-empty text
                            text_block = TextBlock(
                                text=span["text"],
                                bbox=(span["bbox"][0], span["bbox"][1], span["bbox"][2], span["bbox"][3]),
                                font_name=span["font"],
                                font_size=span["size"],
                                font_flags=span["flags"],
                                page_number=page_number,
                                block_number=block_number
                            )
                            text_blocks.append(text_block)
                            block_number += 1
        
        # Create background-only version (we'll implement this next)
        background_content = await self._create_background_only(page)
        
        return ProcessedPage(
            page_number=page_number,
            text_blocks=text_blocks,
            background_content=background_content,
            width=width,
            height=height
        )
    
    async def _create_background_only(self, page: fitz.Page) -> Optional[bytes]:
        """Create a page with text removed (placeholder implementation)"""
        # For now, return None - we'll implement this with pikepdf later
        # This is where we'll use pikepdf to strip text operators
        return None
    
    async def _save_page_segments(self, job: Job, page: ProcessedPage):
        """Save text segments to database"""
        
        for i, text_block in enumerate(page.text_blocks):
            segment = Segment(
                job_id=job.id,
                page_number=page.page_number,
                segment_index=i,
                bbox_x0=text_block.bbox[0],
                bbox_y0=text_block.bbox[1],
                bbox_x1=text_block.bbox[2],
                bbox_y1=text_block.bbox[3],
                source_text=text_block.text,
                font_name=text_block.font_name,
                font_size=text_block.font_size,
                font_flags=text_block.font_flags
            )
            
            self.db.add(segment)
        
        self.db.commit()
    
    def detect_document_type(self, file_path: str) -> Dict[str, Any]:
        """Detect if document is digital or scanned"""
        doc = fitz.open(file_path)
        
        total_pages = len(doc)
        text_pages = 0
        image_pages = 0
        
        for page_num in range(min(5, total_pages)):  # Sample first 5 pages
            page = doc[page_num]
            
            # Check for text content
            text = page.get_text().strip()
            if text:
                text_pages += 1
            
            # Check for images
            image_list = page.get_images()
            if image_list:
                image_pages += 1
        
        doc.close()
        
        # Determine document type
        if text_pages == 0 and image_pages > 0:
            doc_type = "scanned"
        elif text_pages > 0 and image_pages == 0:
            doc_type = "digital"
        else:
            doc_type = "hybrid"
        
        return {
            "type": doc_type,
            "total_pages": total_pages,
            "text_pages": text_pages,
            "image_pages": image_pages,
            "confidence": text_pages / max(1, min(5, total_pages))
        }


class BackgroundCloner:
    """Service for creating background-only PDF pages"""
    
    @staticmethod
    def remove_text_from_pdf(input_path: str, output_path: str) -> bool:
        """Remove text operators from PDF while preserving everything else"""
        
        try:
            with pikepdf.Pdf.open(input_path) as pdf:
                for page in pdf.pages:
                    # Define text operator filter
                    def text_filter(operands, operator):
                        # Remove text show operators
                        text_operators = [
                            pikepdf.Name.Tj,      # Show text
                            pikepdf.Name.TJ,      # Show text with glyph positioning
                            pikepdf.Name.quote,   # Move to next line and show text
                            pikepdf.Name.dquote  # Set word and character spacing, move to next line, show text
                        ]
                        return operator not in text_operators
                    
                    # Apply filter to page content
                    if hasattr(page, 'add_content_token_filter'):
                        page.add_content_token_filter(text_filter)
                
                # Save the result
                pdf.save(output_path)
                return True
                
        except Exception as e:
            print(f"Error removing text from PDF: {e}")
            return False


class MockTranslationService:
    """Mock translation service for testing (replace with real service later)"""
    
    @staticmethod
    async def translate_text(text: str, source_lang: str, target_lang: str) -> str:
        """Mock translation - just adds [TRANSLATED] prefix"""
        if not text.strip():
            return text
        
        # Simple mock translation
        return f"[{target_lang.upper()}] {text}"
    
    @staticmethod
    async def translate_segments(segments: List[str], source_lang: str, target_lang: str) -> List[str]:
        """Translate multiple text segments"""
        translations = []
        for segment in segments:
            translation = await MockTranslationService.translate_text(segment, source_lang, target_lang)
            translations.append(translation)
        return translations
