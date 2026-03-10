from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
from models import Content, Genre, Person, Season, Episode, content_genres, content_cast, content_crew
from schemas import ContentResponse, ContentCreate, ContentUpdate, SeasonResponse, EpisodeResponse
from routers.auth import get_current_user
from models import User

router = APIRouter()

@router.get("/", response_model=List[ContentResponse])
async def get_content(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    content_type: Optional[str] = Query(None),
    genre: Optional[str] = Query(None),
    language: Optional[str] = Query(None),
    featured: bool = Query(False),
    trending: bool = Query(False),
    db: Session = Depends(get_db)
):
    query = db.query(Content).filter(Content.is_active == True)
    
    if content_type:
        query = query.filter(Content.content_type == content_type)
    
    if genre:
        query = query.join(Content.genres).filter(Genre.name.ilike(f"%{genre}%"))
    
    if language:
        query = query.filter(Content.language == language)
    
    if featured:
        query = query.filter(Content.is_featured == True)
    
    if trending:
        query = query.filter(Content.is_trending == True)
    
    content = query.offset(skip).limit(limit).all()
    return content

@router.get("/{content_id}", response_model=ContentResponse)
async def get_content_detail(content_id: int, db: Session = Depends(get_db)):
    content = db.query(Content).filter(Content.id == content_id, Content.is_active == True).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    return content

@router.post("/", response_model=ContentResponse)
async def create_content(
    content: ContentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if user has permission (admin check would go here)
    if current_user.subscription_tier != "premium":
        raise HTTPException(status_code=403, detail="Premium subscription required")
    
    db_content = Content(
        title=content.title,
        description=content.description,
        content_type=content.content_type,
        duration_minutes=content.duration_minutes,
        release_year=content.release_year,
        language=content.language,
        country=content.country,
        rating=content.rating,
        imdb_rating=content.imdb_rating,
        poster_url=content.poster_url,
        backdrop_url=content.backdrop_url,
        trailer_url=content.trailer_url,
        video_url=content.video_url
    )
    
    # Add genres
    if content.genre_ids:
        genres = db.query(Genre).filter(Genre.id.in_(content.genre_ids)).all()
        db_content.genres = genres
    
    # Add cast
    if content.cast_ids:
        cast_members = db.query(Person).filter(Person.id.in_(content.cast_ids)).all()
        db_content.cast_members = cast_members
    
    # Add crew
    if content.crew_ids:
        crew_members = db.query(Person).filter(Person.id.in_(content.crew_ids)).all()
        db_content.crew_members = crew_members
    
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    
    return db_content

@router.put("/{content_id}", response_model=ContentResponse)
async def update_content(
    content_id: int,
    content_update: ContentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_content = db.query(Content).filter(Content.id == content_id).first()
    if not db_content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    # Update fields
    update_data = content_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_content, field, value)
    
    db.commit()
    db.refresh(db_content)
    
    return db_content

@router.delete("/{content_id}")
async def delete_content(
    content_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_content = db.query(Content).filter(Content.id == content_id).first()
    if not db_content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    db_content.is_active = False
    db.commit()
    
    return {"message": "Content deleted successfully"}

@router.get("/{content_id}/seasons", response_model=List[SeasonResponse])
async def get_seasons(content_id: int, db: Session = Depends(get_db)):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    if content.content_type != "series":
        raise HTTPException(status_code=400, detail="Content is not a series")
    
    seasons = db.query(Season).filter(Season.series_id == content_id).order_by(Season.season_number).all()
    return seasons

@router.get("/{content_id}/seasons/{season_number}/episodes", response_model=List[EpisodeResponse])
async def get_episodes(content_id: int, season_number: int, db: Session = Depends(get_db)):
    season = db.query(Season).filter(
        Season.series_id == content_id,
        Season.season_number == season_number
    ).first()
    
    if not season:
        raise HTTPException(status_code=404, detail="Season not found")
    
    episodes = db.query(Episode).filter(Episode.season_id == season.id).order_by(Episode.episode_number).all()
    return episodes

@router.get("/featured", response_model=List[ContentResponse])
async def get_featured_content(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    content = db.query(Content).filter(
        Content.is_featured == True,
        Content.is_active == True
    ).limit(limit).all()
    
    return content

@router.get("/trending", response_model=List[ContentResponse])
async def get_trending_content(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    content = db.query(Content).filter(
        Content.is_trending == True,
        Content.is_active == True
    ).limit(limit).all()
    
    return content

@router.get("/search", response_model=List[ContentResponse])
async def search_content(
    q: str = Query(..., min_length=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    content = db.query(Content).filter(
        Content.is_active == True,
        Content.title.ilike(f"%{q}%")
    ).limit(limit).all()
    
    return content
