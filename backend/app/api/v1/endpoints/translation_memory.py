"""
Translation Memory endpoints
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ....core.database import get_db

router = APIRouter()


@router.get("/")
async def list_translation_memories(db: Session = Depends(get_db)):
    """List translation memory entries"""
    return {"entries": [], "message": "Translation memory coming soon"}


@router.post("/")
async def create_translation_memory(db: Session = Depends(get_db)):
    """Create a new translation memory entry"""
    return {"message": "Translation memory creation coming soon"}
