"""
Database initialization script
"""
import asyncio
from sqlalchemy import create_engine

from .core.config import settings
from .core.database import Base
from .models import job, segment, glossary, translation_memory


def init_db():
    """Initialize the database with all tables"""
    engine = create_engine(settings.database_url)
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")


if __name__ == "__main__":
    init_db()
