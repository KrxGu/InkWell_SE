# InkWell Translate - Development Setup

This guide will help you set up the development environment for InkWell Translate, a PDF translation application that preserves layout and formatting.

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)

## Quick Start with Docker

1. **Clone the repository and navigate to the project directory**

2. **Start all services with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Initialize the database:**
   ```bash
   docker-compose exec backend python -c "from app.db_init import init_db; init_db()"
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Local Development Setup

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a Python virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env file with your configuration
   ```

5. **Start PostgreSQL and Redis (with Docker):**
   ```bash
   docker-compose up db redis -d
   ```

6. **Initialize the database:**
   ```bash
   python -c "from app.db_init import init_db; init_db()"
   ```

7. **Start the backend server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to the project root directory**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env.local file
   echo "VITE_API_URL=http://localhost:8000/api/v1" > .env.local
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Project Structure

```
inkwell-translate/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Configuration and database
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── requirements.txt
│   └── Dockerfile
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── services/          # API integration
│   └── pages/             # Page components
├── docker-compose.yml      # Development environment
└── package.json           # Frontend dependencies
```

## API Endpoints

### Jobs
- `POST /api/v1/jobs` - Create a new translation job
- `GET /api/v1/jobs` - List all jobs
- `GET /api/v1/jobs/{id}` - Get job details
- `POST /api/v1/jobs/{id}/start` - Start job processing
- `POST /api/v1/jobs/{id}/cancel` - Cancel a job

### Upload
- `POST /api/v1/upload/direct` - Direct file upload

### Health
- `GET /health` - Health check endpoint

## Current Implementation Status

### ✅ Completed
- Backend project structure with FastAPI
- Database models for jobs, segments, glossaries, and translation memory
- Basic API endpoints for job management
- File upload functionality
- Frontend integration with real-time job tracking
- Docker development environment

### 🚧 In Progress
- PDF processing pipeline (text extraction, background cloning)
- Translation service integration
- Text shaping and layout preservation

### 📋 Planned
- OCR support for scanned PDFs
- Glossary and translation memory management
- Quality assurance and visual diff checking
- Production deployment configuration

## Testing the Current Implementation

1. **Start the development environment:**
   ```bash
   docker-compose up --build
   ```

2. **Initialize the database:**
   ```bash
   docker-compose exec backend python -c "from app.db_init import init_db; init_db()"
   ```

3. **Test file upload:**
   - Navigate to http://localhost:3000
   - Use the upload section to select a PDF file
   - Choose source and target languages
   - Click "Start Translation"
   - Observe the job creation and status tracking (currently mock data)

## Next Steps

The next development phase will focus on:

1. **PDF Processing Pipeline:**
   - Implementing text extraction with PyMuPDF
   - Creating background cloning with pikepdf
   - Adding OCR support with Tesseract

2. **Translation Integration:**
   - Google Cloud Translation API integration
   - Text segmentation and terminology management
   - HarfBuzz text shaping for complex scripts

3. **Layout Preservation:**
   - Text fitting algorithms
   - Font management and subsetting
   - PDF reconstruction with OCG layers

## Troubleshooting

### Common Issues

1. **Database connection errors:**
   - Ensure PostgreSQL is running: `docker-compose up db -d`
   - Check database URL in environment variables

2. **Frontend API connection issues:**
   - Verify backend is running on port 8000
   - Check CORS settings in backend configuration

3. **File upload errors:**
   - Ensure uploads directory exists and is writable
   - Check file size limits in configuration

### Logs

- **Backend logs:** `docker-compose logs backend`
- **Frontend logs:** `docker-compose logs frontend`
- **Database logs:** `docker-compose logs db`

## Contributing

1. Create a feature branch from main
2. Implement your changes
3. Test thoroughly with the development environment
4. Submit a pull request with detailed description

For questions or issues, please refer to the project documentation or create an issue in the repository.
