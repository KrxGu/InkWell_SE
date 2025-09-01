"""
File upload endpoints
"""
import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from ....core.database import get_db
from ....core.config import settings
from ....schemas.upload import UploadRequest, UploadResponse
from ....services.job_service import JobService
from ....models.job import JobStatus

router = APIRouter()


@router.post("/presigned", response_model=UploadResponse)
async def get_presigned_upload_url(
    upload_request: UploadRequest,
    db: Session = Depends(get_db)
):
    """Get a presigned URL for file upload (local file system version)"""
    
    # Validate file size
    if upload_request.file_size > settings.max_file_size:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Maximum size is {settings.max_file_size} bytes"
        )
    
    # Generate unique file key
    file_key = f"{uuid.uuid4()}/{upload_request.filename}"
    
    # For local development, we'll use direct upload
    # In production, this would generate actual presigned URLs for S3/GCS
    upload_url = f"http://localhost:8000/api/v1/upload/direct"
    
    # Create a temporary job to track the upload
    job_service = JobService(db)
    
    # This is a simplified version - in production you'd create the job after upload
    job_data = {
        "filename": upload_request.filename,
        "file_size": upload_request.file_size,
        "source_language": None,
        "target_language": "en",  # Default, will be updated later
        "options": {"file_key": file_key}
    }
    
    # For now, return upload info without creating job
    # Job will be created when translation is requested
    return {
        "job_id": uuid.uuid4(),
        "upload_url": upload_url,
        "upload_fields": {"file_key": file_key},
        "expires_in": 3600  # 1 hour
    }


@router.post("/direct")
async def direct_upload(
    file: UploadFile = File(...),
    file_key: str = None,
    db: Session = Depends(get_db)
):
    """Direct file upload for development (replaces presigned URL flow)"""
    
    # Validate file type
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )
    
    # Validate file size
    content = await file.read()
    if len(content) > settings.max_file_size:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Maximum size is {settings.max_file_size} bytes"
        )
    
    # Create upload directory if it doesn't exist
    upload_dir = settings.upload_dir
    os.makedirs(upload_dir, exist_ok=True)
    
    # Generate file key if not provided
    if not file_key:
        file_key = f"{uuid.uuid4()}/{file.filename}"
    
    # Save file
    file_path = os.path.join(upload_dir, file_key.replace('/', '_'))
    
    with open(file_path, "wb") as f:
        f.write(content)
    
    return {
        "message": "File uploaded successfully",
        "file_key": file_key,
        "file_size": len(content),
        "filename": file.filename
    }
