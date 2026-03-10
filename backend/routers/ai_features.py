from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

from database import get_db
from models import Content, User, ViewingHistory, Rating, AIRecommendation
from schemas import ContentResponse, AIChatRequest, AIChatResponse, AISummaryRequest, AISummaryResponse
from routers.auth import get_current_user
from config import settings

router = APIRouter()

# Initialize Gemini AI
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro', safety_settings={
    HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
})

@router.post("/chat", response_model=AIChatResponse)
async def ai_chat(
    chat_request: AIChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # Get user context for better recommendations
        user_history = db.query(ViewingHistory).filter(
            ViewingHistory.user_id == current_user.id
        ).order_by(ViewingHistory.last_watched_at.desc()).limit(5).all()
        
        context = "User recently watched: " + ", ".join([h.content.title for h in user_history])
        
        prompt = f"""
        You are an AI assistant for a streaming platform called NeonStream. 
        The user is asking: {chat_request.message}
        
        Context: {context}
        
        Provide a helpful response about movies, TV shows, or entertainment.
        If relevant, suggest content they might enjoy based on their viewing history.
        Keep responses friendly and engaging.
        """
        
        response = model.generate_content(prompt)
        
        # Extract content suggestions from response (this would need more sophisticated parsing)
        suggestions = []  # Would implement content extraction logic here
        
        return AIChatResponse(
            response=response.text,
            suggestions=suggestions
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@router.post("/summarize/{content_id}", response_model=AISummaryResponse)
async def generate_content_summary(
    content_id: int,
    db: Session = Depends(get_db)
):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    try:
        prompt = f"""
        Analyze this movie/TV show and provide:
        Title: {content.title}
        Description: {content.description}
        Genre: {', '.join([g.name for g in content.genres])}
        
        Please provide:
        1. A brief, engaging summary (2-3 sentences)
        2. 3-5 key points about the content
        3. Mood analysis (what emotions it evokes)
        4. Why someone should watch it
        
        Format the response clearly with sections.
        """
        
        response = model.generate_content(prompt)
        
        # Parse the response (would need more sophisticated parsing)
        summary = response.text  # Would extract summary section
        key_points = []  # Would extract key points
        mood_analysis = ""  # Would extract mood analysis
        
        return AISummaryResponse(
            summary=summary,
            key_points=key_points,
            mood_analysis=mood_analysis,
            similar_content=[]  # Would find similar content
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@router.post("/recommendations/generate")
async def generate_ai_recommendations(
    user_id: int,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    try:
        # Get user's viewing history and preferences
        history = db.query(ViewingHistory).filter(
            ViewingHistory.user_id == user_id
        ).order_by(ViewingHistory.last_watched_at.desc()).limit(10).all()
        
        ratings = db.query(Rating).filter(Rating.user_id == user_id).all()
        
        # Create prompt for Gemini
        watched_content = [h.content.title for h in history]
        high_ratings = [r.content.title for r in ratings if r.rating >= 4]
        
        prompt = f"""
        Based on this user's viewing history and preferences:
        Recently watched: {', '.join(watched_content)}
        Highly rated: {', '.join(high_ratings)}
        
        Recommend 10 movies or TV shows they would enjoy.
        For each recommendation, provide:
        1. Title
        2. Reason for recommendation
        3. Confidence score (0-1)
        
        Format as JSON-like structure.
        """
        
        response = model.generate_content(prompt)
        
        # Parse recommendations and save to database
        recommendations = []  # Would parse AI response
        
        for rec in recommendations:
            ai_rec = AIRecommendation(
                user_id=user_id,
                content_id=rec['content_id'],
                recommendation_type="ai_personalized",
                confidence_score=rec['confidence'],
                reason=rec['reason']
            )
            db.add(ai_rec)
        
        db.commit()
        
        return {"message": f"Generated {len(recommendations)} AI recommendations"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@router.post("/content-analysis/{content_id}")
async def analyze_content(
    content_id: int,
    db: Session = Depends(get_db)
):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    try:
        prompt = f"""
        Analyze this content for metadata extraction:
        Title: {content.title}
        Description: {content.description}
        
        Please extract and provide:
        1. Primary emotions/moods (happy, sad, thrilling, etc.)
        2. Target audience age group
        3. Content themes (family, action, romance, etc.)
        4. Viewing complexity (simple, moderate, complex)
        5. Best viewing time (morning, evening, weekend)
        
        Format as structured data.
        """
        
        response = model.generate_content(prompt)
        
        return {"analysis": response.text}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@router.post("/search-intent")
async def understand_search_intent(
    query: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        prompt = f"""
        User is searching for: "{query}"
        
        Analyze their search intent and provide:
        1. What they're looking for (genre, mood, specific title)
        2. Suggested search terms
        3. Content categories that might match
        
        Keep response concise and helpful.
        """
        
        response = model.generate_content(prompt)
        
        return {"intent_analysis": response.text}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@router.get("/mood-based")
async def get_mood_based_recommendations(
    mood: str,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        prompt = f"""
        The user is feeling {mood} and wants to watch something.
        
        Suggest content that matches this mood.
        For each suggestion, explain why it fits the mood.
        
        Focus on content that would be available in a streaming platform.
        """
        
        response = model.generate_content(prompt)
        
        # Would parse response and find matching content in database
        # For now, return the AI response
        
        return {"mood_recommendations": response.text}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")
