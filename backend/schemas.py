from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None

class UserResponse(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    subscription_tier: str
    subscription_expires: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# Authentication schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int

class TokenData(BaseModel):
    username: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Content schemas
class GenreBase(BaseModel):
    name: str
    description: Optional[str] = None

class GenreResponse(GenreBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class PersonBase(BaseModel):
    name: str
    bio: Optional[str] = None
    birth_date: Optional[datetime] = None
    photo_url: Optional[str] = None

class PersonResponse(PersonBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ContentBase(BaseModel):
    title: str
    description: Optional[str] = None
    content_type: str
    duration_minutes: Optional[int] = None
    release_year: Optional[int] = None
    language: Optional[str] = None
    country: Optional[str] = None
    rating: Optional[str] = None
    imdb_rating: Optional[float] = None
    poster_url: Optional[str] = None
    backdrop_url: Optional[str] = None
    trailer_url: Optional[str] = None
    video_url: Optional[str] = None

class ContentCreate(ContentBase):
    genre_ids: Optional[List[int]] = []
    cast_ids: Optional[List[int]] = []
    crew_ids: Optional[List[int]] = []

class ContentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    duration_minutes: Optional[int] = None
    language: Optional[str] = None
    country: Optional[str] = None
    rating: Optional[str] = None
    imdb_rating: Optional[float] = None
    poster_url: Optional[str] = None
    backdrop_url: Optional[str] = None
    trailer_url: Optional[str] = None
    video_url: Optional[str] = None
    is_active: Optional[bool] = None
    is_featured: Optional[bool] = None
    is_trending: Optional[bool] = None

class ContentResponse(ContentBase):
    id: int
    user_rating: float
    is_active: bool
    is_featured: bool
    is_trending: bool
    created_at: datetime
    genres: List[GenreResponse] = []
    cast_members: List[PersonResponse] = []
    crew_members: List[PersonResponse] = []
    
    class Config:
        from_attributes = True

# Season and Episode schemas
class SeasonBase(BaseModel):
    season_number: int
    title: Optional[str] = None
    description: Optional[str] = None
    poster_url: Optional[str] = None
    release_date: Optional[datetime] = None

class SeasonResponse(SeasonBase):
    id: int
    series_id: int
    created_at: datetime
    episodes: List['EpisodeResponse'] = []
    
    class Config:
        from_attributes = True

class EpisodeBase(BaseModel):
    episode_number: int
    title: str
    description: Optional[str] = None
    duration_minutes: Optional[int] = None
    video_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    air_date: Optional[datetime] = None

class EpisodeResponse(EpisodeBase):
    id: int
    season_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Watchlist schemas
class WatchlistAdd(BaseModel):
    content_id: int

class WatchlistResponse(BaseModel):
    id: int
    content_id: int
    added_at: datetime
    content: ContentResponse
    
    class Config:
        from_attributes = True

# Rating schemas
class RatingCreate(BaseModel):
    content_id: int
    rating: float  # 1-5
    review: Optional[str] = None

class RatingResponse(BaseModel):
    id: int
    content_id: int
    rating: float
    review: Optional[str] = None
    created_at: datetime
    content: ContentResponse
    
    class Config:
        from_attributes = True

# Viewing History schemas
class ViewingHistoryCreate(BaseModel):
    content_id: int
    episode_id: Optional[int] = None
    watched_duration: int
    total_duration: int
    completed: bool = False

class ViewingHistoryResponse(BaseModel):
    id: int
    content_id: int
    episode_id: Optional[int] = None
    watched_duration: int
    total_duration: int
    completed: bool
    last_watched_at: datetime
    content: ContentResponse
    episode: Optional[EpisodeResponse] = None
    
    class Config:
        from_attributes = True

# User Preferences schemas
class UserPreferencesBase(BaseModel):
    preferred_genres: Optional[List[int]] = []
    preferred_languages: Optional[List[str]] = []
    preferred_content_types: Optional[List[str]] = []
    auto_play_next: bool = True
    video_quality: str = "auto"
    subtitles_enabled: bool = True
    audio_language: str = "en"
    subtitle_language: str = "en"

class UserPreferencesUpdate(UserPreferencesBase):
    pass

class UserPreferencesResponse(UserPreferencesBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# AI Features schemas
class AIRecommendationRequest(BaseModel):
    user_id: int
    content_type: Optional[str] = None
    limit: int = 10

class AIRecommendationResponse(BaseModel):
    content_id: int
    recommendation_type: str
    confidence_score: float
    reason: str
    content: ContentResponse
    
    class Config:
        from_attributes = True

class AIChatRequest(BaseModel):
    message: str
    context: Optional[str] = None

class AIChatResponse(BaseModel):
    response: str
    suggestions: Optional[List[ContentResponse]] = []

class AISummaryRequest(BaseModel):
    content_id: int

class AISummaryResponse(BaseModel):
    summary: str
    key_points: List[str]
    mood_analysis: str
    similar_content: List[ContentResponse] = []

# Search schemas
class SearchRequest(BaseModel):
    query: str
    content_type: Optional[str] = None
    genres: Optional[List[str]] = []
    language: Optional[str] = None
    year_range: Optional[tuple] = None
    rating_range: Optional[tuple] = None
    sort_by: str = "relevance"  # relevance, newest, oldest, rating, trending
    page: int = 1
    limit: int = 20

class SearchResponse(BaseModel):
    results: List[ContentResponse]
    total_count: int
    page: int
    limit: int
    total_pages: int
