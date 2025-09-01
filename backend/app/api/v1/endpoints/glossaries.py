"""
Glossary management endpoints
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ....core.database import get_db

router = APIRouter()


@router.get("/")
async def list_glossaries(db: Session = Depends(get_db)):
    """List all glossaries"""
    return {"glossaries": [], "message": "Glossary management coming soon"}


@router.post("/")
async def create_glossary(db: Session = Depends(get_db)):
    """Create a new glossary"""
    return {"message": "Glossary creation coming soon"}
