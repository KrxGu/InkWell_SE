"""
Upload-related Pydantic schemas
"""
from typing import Dict, Any
from uuid import UUID
from pydantic import BaseModel, Field


class UploadRequest(BaseModel):
    filename: str = Field(..., min_length=1, max_length=255)
    file_size: int = Field(..., ge=1)
    content_type: str = Field(..., pattern=r"^application/pdf$")


class UploadResponse(BaseModel):
    job_id: UUID
    upload_url: str
    upload_fields: Dict[str, Any]
    expires_in: int  # seconds
    
    class Config:
        from_attributes = True
