"""
Main API router for v1 endpoints
"""
from fastapi import APIRouter

from .endpoints import jobs, upload, glossaries, translation_memory, download

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(jobs.router, prefix="/jobs", tags=["jobs"])
api_router.include_router(upload.router, prefix="/upload", tags=["upload"])
api_router.include_router(download.router, prefix="/download", tags=["download"])
api_router.include_router(glossaries.router, prefix="/glossaries", tags=["glossaries"])
api_router.include_router(translation_memory.router, prefix="/tm", tags=["translation-memory"])
