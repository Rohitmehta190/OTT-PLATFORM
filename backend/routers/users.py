from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import User, Watchlist, ViewingHistory, Rating, UserPreferences
from schemas import UserResponse, UserUpdate, WatchlistResponse, ViewingHistoryResponse, RatingResponse, UserPreferencesResponse, UserPreferencesUpdate
from routers.auth import get_current_user

router = APIRouter()

@router.put("/profile", response_model=UserResponse)
async def update_profile(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    
    return current_user

@router.get("/watchlist", response_model=List[WatchlistResponse])
async def get_watchlist(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    watchlist = db.query(Watchlist).filter(Watchlist.user_id == current_user.id).all()
    return watchlist

@router.post("/watchlist", response_model=WatchlistResponse)
async def add_to_watchlist(
    content_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if already in watchlist
    existing = db.query(Watchlist).filter(
        Watchlist.user_id == current_user.id,
        Watchlist.content_id == content_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Content already in watchlist")
    
    watchlist_item = Watchlist(user_id=current_user.id, content_id=content_id)
    db.add(watchlist_item)
    db.commit()
    db.refresh(watchlist_item)
    
    return watchlist_item

@router.delete("/watchlist/{content_id}")
async def remove_from_watchlist(
    content_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    watchlist_item = db.query(Watchlist).filter(
        Watchlist.user_id == current_user.id,
        Watchlist.content_id == content_id
    ).first()
    
    if not watchlist_item:
        raise HTTPException(status_code=404, detail="Content not found in watchlist")
    
    db.delete(watchlist_item)
    db.commit()
    
    return {"message": "Content removed from watchlist"}

@router.get("/history", response_model=List[ViewingHistoryResponse])
async def get_viewing_history(
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    history = db.query(ViewingHistory).filter(
        ViewingHistory.user_id == current_user.id
    ).order_by(ViewingHistory.last_watched_at.desc()).limit(limit).all()
    
    return history

@router.post("/history", response_model=ViewingHistoryResponse)
async def update_viewing_history(
    viewing_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if history entry already exists
    existing = db.query(ViewingHistory).filter(
        ViewingHistory.user_id == current_user.id,
        ViewingHistory.content_id == viewing_data.get("content_id"),
        ViewingHistory.episode_id == viewing_data.get("episode_id")
    ).first()
    
    if existing:
        # Update existing entry
        existing.watched_duration = viewing_data.get("watched_duration", existing.watched_duration)
        existing.total_duration = viewing_data.get("total_duration", existing.total_duration)
        existing.completed = viewing_data.get("completed", existing.completed)
        existing.last_watched_at = func.now()
    else:
        # Create new entry
        existing = ViewingHistory(
            user_id=current_user.id,
            content_id=viewing_data.get("content_id"),
            episode_id=viewing_data.get("episode_id"),
            watched_duration=viewing_data.get("watched_duration", 0),
            total_duration=viewing_data.get("total_duration", 0),
            completed=viewing_data.get("completed", False)
        )
        db.add(existing)
    
    db.commit()
    db.refresh(existing)
    
    return existing

@router.post("/rate", response_model=RatingResponse)
async def rate_content(
    rating_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if rating already exists
    existing = db.query(Rating).filter(
        Rating.user_id == current_user.id,
        Rating.content_id == rating_data.get("content_id")
    ).first()
    
    if existing:
        # Update existing rating
        existing.rating = rating_data.get("rating")
        existing.review = rating_data.get("review")
    else:
        # Create new rating
        existing = Rating(
            user_id=current_user.id,
            content_id=rating_data.get("content_id"),
            rating=rating_data.get("rating"),
            review=rating_data.get("review")
        )
        db.add(existing)
    
    db.commit()
    db.refresh(existing)
    
    return existing

@router.get("/preferences", response_model=UserPreferencesResponse)
async def get_user_preferences(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    preferences = db.query(UserPreferences).filter(UserPreferences.user_id == current_user.id).first()
    
    if not preferences:
        # Create default preferences
        preferences = UserPreferences(user_id=current_user.id)
        db.add(preferences)
        db.commit()
        db.refresh(preferences)
    
    return preferences

@router.put("/preferences", response_model=UserPreferencesResponse)
async def update_user_preferences(
    preferences_update: UserPreferencesUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    preferences = db.query(UserPreferences).filter(UserPreferences.user_id == current_user.id).first()
    
    if not preferences:
        preferences = UserPreferences(user_id=current_user.id)
        db.add(preferences)
    
    update_data = preferences_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(preferences, field, value)
    
    db.commit()
    db.refresh(preferences)
    
    return preferences
