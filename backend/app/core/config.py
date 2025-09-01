"""
Application configuration settings
"""
import os
from typing import Optional, List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App settings
    app_name: str = "InkWell Translate API"
    version: str = "1.0.0"
    debug: bool = False
    
    # Database
    database_url: str = "postgresql://user:password@localhost/inkwell"
    
    # Redis for caching and task queue
    redis_url: str = "redis://localhost:6379"
    
    # File storage
    upload_dir: str = "uploads"
    max_file_size: int = 100 * 1024 * 1024  # 100MB
    
    # Translation services
    google_credentials_path: Optional[str] = None
    google_project_id: Optional[str] = None
    
    # Security
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # CORS
    allowed_origins: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    class Config:
        env_file = ".env"


settings = Settings()
