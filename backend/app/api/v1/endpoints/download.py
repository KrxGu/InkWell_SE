"""
File download endpoints
"""
import os
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from ....core.database import get_db
from ....core.config import settings
from ....services.job_service import JobService
from ....models.job import JobStatus

router = APIRouter()


@router.get("/{job_id}")
async def download_translated_file(
    job_id: UUID,
    db: Session = Depends(get_db)
):
    """Download the translated PDF file"""
    
    job_service = JobService(db)
    job = await job_service.get_job(job_id)
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if job.status != JobStatus.COMPLETED:
        raise HTTPException(
            status_code=400,
            detail=f"Job is not completed. Current status: {job.status}"
        )
    
    # Construct output file path
    output_filename = f"translated_{job.filename}"
    output_path = os.path.join(settings.upload_dir, f"{job.id}_{output_filename}")
    
    if not os.path.exists(output_path):
        raise HTTPException(status_code=404, detail="Translated file not found")
    
    # Return file response
    return FileResponse(
        path=output_path,
        filename=output_filename,
        media_type="application/pdf"
    )
