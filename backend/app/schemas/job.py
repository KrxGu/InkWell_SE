"""
Job-related Pydantic schemas
"""
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field

from ..models.job import JobStatus


class JobCreate(BaseModel):
    filename: str = Field(..., min_length=1, max_length=255)
    file_size: Optional[int] = Field(None, ge=0)
    source_language: Optional[str] = Field(None, min_length=2, max_length=10)
    target_language: str = Field(..., min_length=2, max_length=10)
    options: Optional[Dict[str, Any]] = Field(default_factory=dict)


class JobResponse(BaseModel):
    id: UUID
    filename: str
    file_size: Optional[int]
    source_language: Optional[str]
    target_language: str
    status: JobStatus
    progress_percent: float
    current_stage: Optional[str]
    current_page: int
    total_pages: int
    download_url: Optional[str]
    error_message: Optional[str]
    processing_time: Optional[float]
    created_at: datetime
    completed_at: Optional[datetime]
    
    class Config:
        from_attributes = True


class JobListResponse(BaseModel):
    jobs: List[JobResponse]
    total: int
    skip: int
    limit: int


class JobProgress(BaseModel):
    job_id: UUID
    status: JobStatus
    progress_percent: float
    current_stage: Optional[str]
    current_page: int
    total_pages: int
    message: Optional[str]
    
    class Config:
        from_attributes = True
