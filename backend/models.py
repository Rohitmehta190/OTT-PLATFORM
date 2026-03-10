from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, ForeignKey, Table, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime

Base = declarative_base()

# Many-to-many relationship tables
content_genres = Table(
    'content_genres',
    Base.metadata,
    Column('content_id', Integer, ForeignKey('content.id'), primary_key=True),
    Column('genre_id', Integer, ForeignKey('genres.id'), primary_key=True)
)

content_cast = Table(
    'content_cast',
    Base.metadata,
    Column('content_id', Integer, ForeignKey('content.id'), primary_key=True),
    Column('person_id', Integer, ForeignKey('people.id'), primary_key=True),
    Column('role', String(50))  # actor, director, writer, etc.
)

content_crew = Table(
    'content_crew',
    Base.metadata,
    Column('content_id', Integer, ForeignKey('content.id'), primary_key=True),
    Column('person_id', Integer, ForeignKey('people.id'), primary_key=True),
    Column('role', String(50))
)

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    phone = Column(String(20))
    avatar_url = Column(String(500))
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    subscription_tier = Column(String(50), default="free")  # free, basic, premium
    subscription_expires = Column(DateTime)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    watchlist = relationship("Watchlist", back_populates="user")
    viewing_history = relationship("ViewingHistory", back_populates="user")
    ratings = relationship("Rating", back_populates="user")
    preferences = relationship("UserPreferences", back_populates="user", uselist=False)

class Content(Base):
    __tablename__ = "content"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    content_type = Column(String(50), nullable=False)  # movie, series, documentary
    duration_minutes = Column(Integer)
    release_year = Column(Integer)
    language = Column(String(50))
    country = Column(String(100))
    rating = Column(String(10))  # PG, PG-13, R, etc.
    imdb_rating = Column(Float)
    user_rating = Column(Float, default=0.0)
    poster_url = Column(String(500))
    backdrop_url = Column(String(500))
    trailer_url = Column(String(500))
    video_url = Column(String(500))
    is_active = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    is_trending = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    genres = relationship("Genre", secondary=content_genres, back_populates="content")
    cast_members = relationship("Person", secondary=content_cast, back_populates="content_as_cast")
    crew_members = relationship("Person", secondary=content_crew, back_populates="content_as_crew")
    seasons = relationship("Season", back_populates="series")
    ratings = relationship("Rating", back_populates="content")
    watchlist_items = relationship("Watchlist", back_populates="content")
    viewing_history = relationship("ViewingHistory", back_populates="content")

class Genre(Base):
    __tablename__ = "genres"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    content = relationship("Content", secondary=content_genres, back_populates="genres")

class Person(Base):
    __tablename__ = "people"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    bio = Column(Text)
    birth_date = Column(DateTime)
    photo_url = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    content_as_cast = relationship("Content", secondary=content_cast, back_populates="cast_members")
    content_as_crew = relationship("Content", secondary=content_crew, back_populates="crew_members")

class Season(Base):
    __tablename__ = "seasons"
    
    id = Column(Integer, primary_key=True, index=True)
    series_id = Column(Integer, ForeignKey("content.id"), nullable=False)
    season_number = Column(Integer, nullable=False)
    title = Column(String(255))
    description = Column(Text)
    poster_url = Column(String(500))
    release_date = Column(DateTime)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    series = relationship("Content", back_populates="seasons")
    episodes = relationship("Episode", back_populates="season")

class Episode(Base):
    __tablename__ = "episodes"
    
    id = Column(Integer, primary_key=True, index=True)
    season_id = Column(Integer, ForeignKey("seasons.id"), nullable=False)
    episode_number = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    duration_minutes = Column(Integer)
    video_url = Column(String(500))
    thumbnail_url = Column(String(500))
    air_date = Column(DateTime)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    season = relationship("Season", back_populates="episodes")

class Watchlist(Base):
    __tablename__ = "watchlist"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content_id = Column(Integer, ForeignKey("content.id"), nullable=False)
    added_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="watchlist")
    content = relationship("Content", back_populates="watchlist_items")

class ViewingHistory(Base):
    __tablename__ = "viewing_history"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content_id = Column(Integer, ForeignKey("content.id"), nullable=False)
    episode_id = Column(Integer, ForeignKey("episodes.id"))
    watched_duration = Column(Integer, default=0)  # seconds
    total_duration = Column(Integer)  # seconds
    completed = Column(Boolean, default=False)
    last_watched_at = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="viewing_history")
    content = relationship("Content", back_populates="viewing_history")
    episode = relationship("Episode")

class Rating(Base):
    __tablename__ = "ratings"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content_id = Column(Integer, ForeignKey("content.id"), nullable=False)
    rating = Column(Float, nullable=False)  # 1-5 stars
    review = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="ratings")
    content = relationship("Content", back_populates="ratings")

class UserPreferences(Base):
    __tablename__ = "user_preferences"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    preferred_genres = Column(JSON)  # List of genre IDs
    preferred_languages = Column(JSON)  # List of language codes
    preferred_content_types = Column(JSON)  # movie, series, etc.
    auto_play_next = Column(Boolean, default=True)
    video_quality = Column(String(20), default="auto")  # auto, 1080p, 720p, 480p
    subtitles_enabled = Column(Boolean, default=True)
    audio_language = Column(String(10), default="en")
    subtitle_language = Column(String(10), default="en")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="preferences")

class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content_id = Column(Integer, ForeignKey("content.id"), nullable=False)
    recommendation_type = Column(String(50))  # similar, trending, personalized
    confidence_score = Column(Float)
    reason = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User")
    content = relationship("Content")
