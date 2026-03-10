from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
import random

from database import get_db
from models import Content, User, ViewingHistory, Rating, Genre, content_genres
from schemas import ContentResponse, AIRecommendationResponse
from routers.auth import get_current_user

router = APIRouter()

@router.get("/similar/{content_id}", response_model=List[ContentResponse])
async def get_similar_content(content_id: int, limit: int = 10, db: Session = Depends(get_db)):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    # Get content with same genres
    similar_content = db.query(Content).join(Content.genres).filter(
        Content.genres.any(Genre.id.in_([g.id for g in content.genres])),
        Content.id != content_id,
        Content.is_active == True
    ).limit(limit * 2).all()  # Get more to randomize
    
    # Randomize and limit
    random.shuffle(similar_content)
    return similar_content[:limit]

@router.get("/trending", response_model=List[ContentResponse])
async def get_trending_recommendations(limit: int = 10, db: Session = Depends(get_db)):
    # Get content based on viewing history and ratings
    trending = db.query(Content).filter(
        Content.is_trending == True,
        Content.is_active == True
    ).order_by(Content.user_rating.desc()).limit(limit).all()
    
    return trending

@router.get("/continue-watching", response_model=List[ContentResponse])
async def get_continue_watching(
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get partially watched content
    history = db.query(ViewingHistory).filter(
        ViewingHistory.user_id == current_user.id,
        ViewingHistory.completed == False
    ).order_by(ViewingHistory.last_watched_at.desc()).limit(limit).all()
    
    return [h.content for h in history]

@router.get("/because-you-watched/{content_id}", response_model=List[ContentResponse])
async def get_because_you_watched(
    content_id: int,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    # Get content watched by users who also watched this content
    similar_users = db.query(ViewingHistory.user_id).filter(
        ViewingHistory.content_id == content_id
    ).distinct().subquery()
    
    recommendations = db.query(Content).join(ViewingHistory).filter(
        ViewingHistory.user_id.in_(similar_users),
        Content.id != content_id,
        Content.is_active == True
    ).group_by(Content.id).order_by(func.count(ViewingHistory.id).desc()).limit(limit).all()
    
    return recommendations

@router.get("/personalized", response_model=List[ContentResponse])
async def get_personalized_recommendations(
    limit: int = 20,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get user's viewing history and ratings
    user_genres = db.query(Genre.id).join(content_genres).join(ViewingHistory).filter(
        ViewingHistory.user_id == current_user.id
    ).distinct().all()
    
    genre_ids = [g[0] for g in user_genres]
    
    if not genre_ids:
        # If no history, return featured content
        return db.query(Content).filter(
            Content.is_featured == True,
            Content.is_active == True
        ).limit(limit).all()
    
    # Get content in preferred genres
    recommendations = db.query(Content).join(Content.genres).filter(
        Content.genres.any(Genre.id.in_(genre_ids)),
        Content.is_active == True
    ).distinct().limit(limit * 2).all()
    
    # Randomize and limit
    random.shuffle(recommendations)
    return recommendations[:limit]

@router.get("/new-releases", response_model=List[ContentResponse])
async def get_new_releases(limit: int = 10, db: Session = Depends(get_db)):
    # Get recently added content
    new_releases = db.query(Content).filter(
        Content.is_active == True
    ).order_by(Content.created_at.desc()).limit(limit).all()
    
    return new_releases

@router.get("/top-rated", response_model=List[ContentResponse])
async def get_top_rated(limit: int = 10, db: Session = Depends(get_db)):
    # Get highest rated content
    top_rated = db.query(Content).filter(
        Content.is_active == True
    ).order_by(Content.user_rating.desc()).limit(limit).all()
    
    return top_rated
