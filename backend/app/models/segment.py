"""
Segment model for individual text segments within a job
"""
import uuid
from sqlalchemy import Column, String, Integer, Float, ForeignKey, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..core.database import Base


class Segment(Base):
    __tablename__ = "segments"
    
    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Job reference
    job_id = Column(UUID(as_uuid=True), ForeignKey("jobs.id"), nullable=False)
    
    # Position information
    page_number = Column(Integer, nullable=False)
    segment_index = Column(Integer, nullable=False)  # Order within page
    
    # Bounding box coordinates
    bbox_x0 = Column(Float, nullable=False)
    bbox_y0 = Column(Float, nullable=False) 
    bbox_x1 = Column(Float, nullable=False)
    bbox_y1 = Column(Float, nullable=False)
    
    # Text content
    source_text = Column(Text, nullable=False)
    translated_text = Column(Text, nullable=True)
    post_edited_text = Column(Text, nullable=True)  # Human corrections
    
    # Font and style information
    font_name = Column(String, nullable=True)
    font_size = Column(Float, nullable=True)
    font_flags = Column(Integer, default=0)  # Bold, italic, etc.
    
    # Translation metadata
    translation_method = Column(String, nullable=True)  # "mt", "tm", "glossary"
    confidence_score = Column(Float, nullable=True)
    tm_match_score = Column(Float, nullable=True)
    
    # QA flags
    qa_flags = Column(JSON, default=[])  # List of QA issues
    
    # Relationships
    job = relationship("Job", back_populates="segments")
    
    def __repr__(self):
        return f"<Segment(id={self.id}, page={self.page_number}, text='{self.source_text[:50]}...')>"
    
    @property
    def bbox_width(self):
        return self.bbox_x1 - self.bbox_x0
    
    @property 
    def bbox_height(self):
        return self.bbox_y1 - self.bbox_y0
    
    def to_dict(self):
        return {
            "id": str(self.id),
            "job_id": str(self.job_id),
            "page_number": self.page_number,
            "segment_index": self.segment_index,
            "bbox": {
                "x0": self.bbox_x0,
                "y0": self.bbox_y0,
                "x1": self.bbox_x1,
                "y1": self.bbox_y1,
                "width": self.bbox_width,
                "height": self.bbox_height,
            },
            "source_text": self.source_text,
            "translated_text": self.translated_text,
            "post_edited_text": self.post_edited_text,
            "font_name": self.font_name,
            "font_size": self.font_size,
            "translation_method": self.translation_method,
            "confidence_score": self.confidence_score,
            "tm_match_score": self.tm_match_score,
            "qa_flags": self.qa_flags,
        }
