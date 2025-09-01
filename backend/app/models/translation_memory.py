"""
Translation Memory model for reusing previous translations
"""
import uuid
import hashlib
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Float, Integer, Index
from sqlalchemy.dialects.postgresql import UUID

from ..core.database import Base


class TranslationMemory(Base):
    __tablename__ = "translation_memory"
    
    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Source and target text
    source_text = Column(String, nullable=False)
    target_text = Column(String, nullable=False)
    
    # Language pair
    source_language = Column(String(10), nullable=False)
    target_language = Column(String(10), nullable=False)
    
    # Context for better matching
    context_before = Column(String, nullable=True)  # Previous sentence
    context_after = Column(String, nullable=True)   # Next sentence
    
    # Metadata
    domain = Column(String, nullable=True)
    source_file = Column(String, nullable=True)  # Original filename
    
    # Quality and matching
    quality_score = Column(Float, default=1.0)  # 0.0 to 1.0
    match_count = Column(Integer, default=1)    # How many times this pair was used
    
    # Hash for fast lookups
    source_hash = Column(String(64), nullable=False, index=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    last_used_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Create composite index for fast language pair lookups
    __table_args__ = (
        Index('ix_tm_lang_pair_hash', 'source_language', 'target_language', 'source_hash'),
    )
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if self.source_text:
            self.source_hash = self.generate_hash(self.source_text)
    
    @staticmethod
    def generate_hash(text: str) -> str:
        """Generate a hash for the source text for fast lookups"""
        normalized_text = text.lower().strip()
        return hashlib.sha256(normalized_text.encode('utf-8')).hexdigest()
    
    def __repr__(self):
        return f"<TM({self.source_language}->{self.target_language}: '{self.source_text[:30]}...')>"
    
    def to_dict(self):
        return {
            "id": str(self.id),
            "source_text": self.source_text,
            "target_text": self.target_text,
            "source_language": self.source_language,
            "target_language": self.target_language,
            "context_before": self.context_before,
            "context_after": self.context_after,
            "domain": self.domain,
            "source_file": self.source_file,
            "quality_score": self.quality_score,
            "match_count": self.match_count,
            "created_at": self.created_at.isoformat(),
            "last_used_at": self.last_used_at.isoformat(),
        }
