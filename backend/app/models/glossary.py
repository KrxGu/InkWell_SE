"""
Glossary model for terminology management
"""
import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Boolean, Integer
from sqlalchemy.dialects.postgresql import UUID

from ..core.database import Base


class Glossary(Base):
    __tablename__ = "glossaries"
    
    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Term information
    source_term = Column(String, nullable=False, index=True)
    target_term = Column(String, nullable=False)
    
    # Language pair
    source_language = Column(String(10), nullable=False, index=True)
    target_language = Column(String(10), nullable=False, index=True)
    
    # Glossary metadata
    domain = Column(String, nullable=True)  # legal, medical, technical, etc.
    definition = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    
    # Matching options
    case_sensitive = Column(Boolean, default=False)
    exact_match_only = Column(Boolean, default=True)
    priority = Column(Integer, default=1)  # Higher number = higher priority
    
    # Usage tracking
    usage_count = Column(Integer, default=0)
    last_used_at = Column(DateTime, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"<Glossary({self.source_language}->{self.target_language}: '{self.source_term}' -> '{self.target_term}')>"
    
    def to_dict(self):
        return {
            "id": str(self.id),
            "source_term": self.source_term,
            "target_term": self.target_term,
            "source_language": self.source_language,
            "target_language": self.target_language,
            "domain": self.domain,
            "definition": self.definition,
            "notes": self.notes,
            "case_sensitive": self.case_sensitive,
            "exact_match_only": self.exact_match_only,
            "priority": self.priority,
            "usage_count": self.usage_count,
            "last_used_at": self.last_used_at.isoformat() if self.last_used_at else None,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
