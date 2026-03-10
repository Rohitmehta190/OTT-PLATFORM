# NeonStream Backend API

A modern, AI-powered OTT platform backend built with FastAPI, PostgreSQL, and Google Gemini AI.

## Features

- **User Authentication**: JWT-based auth with registration, login, profile management
- **Content Management**: Movies, TV series, documentaries with full metadata
- **AI Integration**: Google Gemini for recommendations, content analysis, and chat features
- **Video Streaming**: Support for multiple video formats and qualities
- **Search & Filtering**: Advanced search with Elasticsearch
- **User Preferences**: Personalized recommendations and viewing history
- **Subscription Management**: Multiple subscription tiers with Stripe integration
- **Real-time Notifications**: WebSocket support for live updates

## Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT with bcrypt password hashing
- **AI**: Google Gemini API
- **File Storage**: AWS S3
- **Cache**: Redis
- **Search**: Elasticsearch
- **Payments**: Stripe
- **Email**: SendGrid

## Quick Start

### Prerequisites

- Python 3.9+
- PostgreSQL
- Redis
- Node.js (for frontend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd neonstream/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb neonstream_db
   
   # Run migrations (if using Alembic)
   alembic upgrade head
   ```

6. **Start the server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Content
- `GET /api/content` - Get all content with filters
- `GET /api/content/{id}` - Get content by ID
- `POST /api/content` - Create new content (admin)
- `PUT /api/content/{id}` - Update content (admin)
- `GET /api/content/featured` - Get featured content
- `GET /api/content/trending` - Get trending content
- `GET /api/content/search` - Search content

### Users
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/watchlist` - Get user watchlist
- `POST /api/users/watchlist` - Add to watchlist
- `DELETE /api/users/watchlist/{id}` - Remove from watchlist
- `GET /api/users/history` - Get viewing history
- `POST /api/users/rate` - Rate content

### Recommendations
- `GET /api/recommendations/similar/{id}` - Get similar content
- `GET /api/recommendations/trending` - Get trending recommendations
- `GET /api/recommendations/continue-watching` - Continue watching
- `GET /api/recommendations/personalized` - Personalized recommendations

### AI Features
- `POST /api/ai/chat` - AI chat assistant
- `POST /api/ai/summarize/{id}` - Generate content summary
- `POST /api/ai/recommendations/generate` - Generate AI recommendations
- `POST /api/ai/content-analysis/{id}` - Analyze content with AI

## Database Schema

### Core Tables
- **users**: User accounts and profiles
- **content**: Movies, series, documentaries
- **genres**: Content categories
- **people**: Actors, directors, crew
- **seasons**: TV series seasons
- **episodes**: TV series episodes

### User Data
- **watchlist**: User's saved content
- **viewing_history**: User's watch history
- **ratings**: User ratings and reviews
- **user_preferences**: User settings and preferences

### AI & Analytics
- **ai_recommendations**: AI-generated recommendations
- **content_analytics**: Content performance metrics

## Environment Variables

### Required
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT secret key
- `GEMINI_API_KEY`: Google Gemini API key

### Optional
- `REDIS_URL`: Redis connection (default: redis://localhost:6379)
- `STRIPE_SECRET_KEY`: Stripe secret key for payments
- `SENDGRID_API_KEY`: SendGrid API key for emails
- `AWS_ACCESS_KEY_ID`: AWS access key for S3
- `AWS_SECRET_ACCESS_KEY`: AWS secret key for S3

## Development

### Running Tests
```bash
pytest tests/
```

### Code Formatting
```bash
black .
isort .
```

### Type Checking
```bash
mypy .
```

## Deployment

### Docker
```bash
docker build -t neonstream-backend .
docker run -p 8000:8000 neonstream-backend
```

### Production Considerations
- Use environment variables for all secrets
- Enable HTTPS
- Set up proper logging
- Configure rate limiting
- Use production database
- Set up monitoring and alerting

## AI Integration

The platform uses Google Gemini AI for:

1. **Content Recommendations**: Personalized suggestions based on viewing history
2. **Content Analysis**: Automatic metadata extraction and categorization
3. **Chat Assistant**: AI-powered customer support and content discovery
4. **Mood Detection**: Analyze content emotional tone
5. **Search Enhancement**: Understand user search intent

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection

## Performance Optimization

- Database indexing
- Redis caching
- Connection pooling
- Lazy loading
- Pagination
- Image optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
