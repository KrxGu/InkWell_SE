#!/bin/bash

# Development startup script for InkWell Translate

echo "🚀 Starting InkWell Translate Development Environment"

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build and start all services
echo "📦 Building and starting services..."
docker-compose up --build -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Initialize database
echo "🗄️ Initializing database..."
docker-compose exec -T backend python -c "from app.db_init import init_db; init_db()" || echo "Database already initialized"

echo ""
echo "✅ Development environment is ready!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "📋 Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop services: docker-compose down"
echo "  - Backend logs: docker-compose logs -f backend"
echo "  - Frontend logs: docker-compose logs -f frontend"
echo ""
echo "Happy coding! 🎉"
