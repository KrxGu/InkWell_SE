"""
Job management endpoints
"""
from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from ....core.database import get_db
from ....models.job import Job, JobStatus
from ....schemas.job import JobCreate, JobResponse, JobListResponse
from ....services.job_service import JobService

router = APIRouter()


@router.post("/", response_model=JobResponse)
async def create_job(
    job_data: JobCreate,
    db: Session = Depends(get_db)
):
    """Create a new translation job"""
    job_service = JobService(db)
    
    try:
        job = await job_service.create_job(job_data)
        return job.to_dict()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=JobListResponse)
async def list_jobs(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    status: Optional[JobStatus] = None,
    db: Session = Depends(get_db)
):
    """List translation jobs with pagination"""
    job_service = JobService(db)
    
    jobs, total = await job_service.list_jobs(
        skip=skip, 
        limit=limit, 
        status=status
    )
    
    return {
        "jobs": [job.to_dict() for job in jobs],
        "total": total,
        "skip": skip,
        "limit": limit
    }


@router.get("/{job_id}", response_model=JobResponse)
async def get_job(
    job_id: UUID,
    db: Session = Depends(get_db)
):
    """Get a specific job by ID"""
    job_service = JobService(db)
    
    job = await job_service.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return job.to_dict()


@router.post("/{job_id}/start")
async def start_job(
    job_id: UUID,
    db: Session = Depends(get_db)
):
    """Start processing a job"""
    job_service = JobService(db)
    
    job = await job_service.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if job.status != JobStatus.UPLOADED:
        raise HTTPException(
            status_code=400, 
            detail=f"Job cannot be started. Current status: {job.status}"
        )
    
    # Queue the job for processing
    await job_service.queue_job(job)
    
    return {"message": "Job queued for processing", "job_id": str(job_id)}


@router.post("/{job_id}/cancel")
async def cancel_job(
    job_id: UUID,
    db: Session = Depends(get_db)
):
    """Cancel a running job"""
    job_service = JobService(db)
    
    job = await job_service.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if job.status in [JobStatus.COMPLETED, JobStatus.FAILED, JobStatus.CANCELLED]:
        raise HTTPException(
            status_code=400,
            detail=f"Job cannot be cancelled. Current status: {job.status}"
        )
    
    await job_service.cancel_job(job)
    
    return {"message": "Job cancelled", "job_id": str(job_id)}


@router.delete("/{job_id}")
async def delete_job(
    job_id: UUID,
    db: Session = Depends(get_db)
):
    """Delete a job and its associated data"""
    job_service = JobService(db)
    
    job = await job_service.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    await job_service.delete_job(job)
    
    return {"message": "Job deleted", "job_id": str(job_id)}
