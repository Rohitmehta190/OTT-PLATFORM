from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from datetime import datetime, timedelta
import hashlib
import jwt

# Simple FastAPI app for demo
app = FastAPI(
    title="NeonStream API",
    description="AI-Powered OTT Platform Backend - Demo Version",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory data store
users_db = {}
content_db = []

# Sample content data
sample_content = [
    {
        "id": 1,
        "title": "Neon Dreams",
        "description": "A cyberpunk thriller set in a dystopian future where AI and humanity collide.",
        "content_type": "movie",
        "duration_minutes": 120,
        "release_year": 2024,
        "language": "English",
        "rating": "PG-13",
        "imdb_rating": 8.5,
        "user_rating": 8.7,
        "poster_url": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba8?w=400&h=600&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop",
        "trailer_url": "https://example.com/trailer1.mp4",
        "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "is_active": True,
        "is_featured": True,
        "is_trending": True,
        "genres": [{"id": 1, "name": "Sci-Fi"}, {"id": 2, "name": "Thriller"}],
        "created_at": datetime.now().isoformat()
    },
    {
        "id": 2,
        "title": "Digital Revolution",
        "description": "An epic documentary about the rise of artificial intelligence and its impact on society.",
        "content_type": "documentary",
        "duration_minutes": 90,
        "release_year": 2024,
        "language": "English",
        "rating": "PG",
        "imdb_rating": 7.8,
        "user_rating": 8.1,
        "poster_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop",
        "trailer_url": "https://example.com/trailer2.mp4",
        "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        "is_active": True,
        "is_featured": True,
        "is_trending": False,
        "genres": [{"id": 3, "name": "Documentary"}, {"id": 4, "name": "Technology"}],
        "created_at": datetime.now().isoformat()
    },
    {
        "id": 3,
        "title": "Quantum Hearts",
        "description": "A romantic sci-fi series about love across parallel universes.",
        "content_type": "series",
        "duration_minutes": 45,
        "release_year": 2024,
        "language": "English",
        "rating": "PG-13",
        "imdb_rating": 8.2,
        "user_rating": 8.5,
        "poster_url": "https://images.unsplash.com/photo-1516214104703-d870798faf8f?w=400&h=600&fit=crop",
        "backdrop_url": "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1920&h=1080&fit=crop",
        "trailer_url": "https://example.com/trailer3.mp4",
        "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "is_active": True,
        "is_featured": False,
        "is_trending": True,
        "genres": [{"id": 5, "name": "Romance"}, {"id": 1, "name": "Sci-Fi"}],
        "created_at": datetime.now().isoformat()
    }
]

# Initialize with sample data
content_db.extend(sample_content)

# Pydantic models
class UserCreate(BaseModel):
    email: str
    username: str
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int

# Helper functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, "your-secret-key", algorithm="HS256")
    return encoded_jwt

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

# Routes
@app.get("/")
async def root():
    return {"message": "Welcome to NeonStream API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "NeonStream API"}

@app.post("/api/auth/register")
async def register(user: UserCreate):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    users_db[user.email] = {
        "email": user.email,
        "username": user.username,
        "password_hash": hash_password(user.password),
        "first_name": user.first_name,
        "last_name": user.last_name,
        "is_active": True,
        "is_verified": False,
        "subscription_tier": "free",
        "created_at": datetime.now().isoformat()
    }
    
    return {"message": "User registered successfully", "email": user.email}

@app.post("/api/auth/login", response_model=Token)
async def login(user_data: UserLogin):
    user = users_db.get(user_data.email)
    if not user or user["password_hash"] != hash_password(user_data.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token({"sub": user["username"]})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": 1800
    }

@app.get("/api/auth/me")
async def get_current_user():
    # Simplified - in production, verify JWT token
    return {
        "id": 1,
        "email": "demo@neonstream.com",
        "username": "demo_user",
        "first_name": "Demo",
        "last_name": "User",
        "is_active": True,
        "subscription_tier": "premium"
    }

@app.get("/api/content")
async def get_content():
    return content_db

@app.get("/api/content/featured")
async def get_featured_content():
    return [item for item in content_db if item["is_featured"]]

@app.get("/api/content/trending")
async def get_trending_content():
    return [item for item in content_db if item["is_trending"]]

@app.get("/api/content/{content_id}")
async def get_content_detail(content_id: int):
    content = next((item for item in content_db if item["id"] == content_id), None)
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    return content

@app.get("/api/content/search")
async def search_content(q: str = ""):
    if not q:
        return content_db[:10]
    
    filtered = [
        item for item in content_db 
        if q.lower() in item["title"].lower() or q.lower() in item["description"].lower()
    ]
    return filtered

@app.get("/api/recommendations/personalized")
async def get_personalized_recommendations():
    return content_db[:2]

@app.get("/api/recommendations/continue-watching")
async def get_continue_watching():
    return content_db[:2]

if __name__ == "__main__":
    uvicorn.run(
        "main_simple:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
