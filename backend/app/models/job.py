"""
Job model for tracking translation jobs
"""
import uuid
from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import Column, String, DateTime, Enum as SQLEnum, JSON, Float, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..core.database import Base


class JobStatus(str, Enum):
    PENDING = "pending"
    UPLOADING = "uploading" 
    UPLOADED = "uploaded"
    EXTRACTING = "extracting"
    TRANSLATING = "translating"
    SHAPING = "shaping"
    BUILDING = "building"
    QA_CHECK = "qa_check"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class Job(Base):
    __tablename__ = "jobs"
    
    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # File information
    filename = Column(String, nullable=False)
    file_key = Column(String, nullable=True)  # S3/storage key
    file_size = Column(Integer, nullable=True)
    
    # Language settings
    source_language = Column(String(10), nullable=True)  # ISO language code
    target_language = Column(String(10), nullable=False)
    
    # Job configuration
    options = Column(JSON, default={})  # Additional options like glossary_id, etc.
    
    # Status tracking
    status = Column(SQLEnum(JobStatus), default=JobStatus.PENDING, nullable=False)
    progress_percent = Column(Float, default=0.0)
    current_stage = Column(String, nullable=True)
    current_page = Column(Integer, default=0)
    total_pages = Column(Integer, default=0)
    
    # Results
    output_file_key = Column(String, nullable=True)
    download_url = Column(String, nullable=True)
    
    # Metadata
    error_message = Column(String, nullable=True)
    processing_time = Column(Float, nullable=True)  # seconds
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    # Relationships
    segments = relationship("Segment", back_populates="job", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Job(id={self.id}, filename={self.filename}, status={self.status})>"
    
    def to_dict(self):
        return {
            "id": str(self.id),
            "filename": self.filename,
            "file_size": self.file_size,
            "source_language": self.source_language,
            "target_language": self.target_language,
            "status": self.status,
            "progress_percent": self.progress_percent,
            "current_stage": self.current_stage,
            "current_page": self.current_page,
            "total_pages": self.total_pages,
            "download_url": self.download_url,
            "error_message": self.error_message,
            "processing_time": self.processing_time,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
        }
