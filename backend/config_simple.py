from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Database - Using SQLite for demo
    DATABASE_URL: str = "sqlite:///./neonstream.db"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"]
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    
    # Redis (optional for demo)
    REDIS_URL: str = "redis://localhost:6379"
    
    # Gemini AI (optional for demo)
    GEMINI_API_KEY: str = "demo-key"
    
    # File Storage
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 100 * 1024 * 1024  # 100MB
    
    class Config:
        env_file = ".env"

settings = Settings()
