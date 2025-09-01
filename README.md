# 📄 InkWell Translate

> **AI-Powered PDF Translation with Perfect Layout Preservation**

InkWell Translate is a comprehensive full-stack application that translates PDF documents while maintaining their exact formatting, fonts, and visual elements. Built with modern web technologies and designed for enterprise-grade translation workflows.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-Phase%201%20Complete-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

### 🔧 **Core Functionality**
- **PDF Text Extraction** with precise coordinate tracking using PyMuPDF
- **Layout Preservation** maintains exact formatting, images, and visual elements
- **Real-time Processing** with live progress updates and status tracking
- **Multi-language Support** for 100+ languages including RTL and CJK scripts
- **Background Processing** with scalable worker architecture

### 🎯 **Translation Pipeline**
- **Intelligent Text Segmentation** preserves document structure
- **Mock Translation Service** for development and testing
- **Translation Memory** for consistency and reuse
- **Glossary Management** for terminology control
- **Quality Assurance** with automated checks

### 🏗️ **Architecture**
- **FastAPI Backend** with comprehensive REST API
- **React Frontend** with TypeScript and modern UI
- **PostgreSQL Database** with complete schema
- **Redis** for caching and session management
- **Docker** development environment

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Option 1: One-Command Setup
```bash
git clone https://github.com/KrxGu/InkWell_SE.git
cd InkWell_SE
./start-dev.sh
```

### Option 2: Manual Setup
```bash
# Clone the repository
git clone https://github.com/KrxGu/InkWell_SE.git
cd InkWell_SE

# Start all services
docker-compose up --build -d

# Initialize the database
docker-compose exec backend python -c "from app.db_init import init_db; init_db()"
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🛠️ Development

### Project Structure
```
InkWell_SE/
├── 📁 backend/              # FastAPI application
│   ├── app/
│   │   ├── api/            # REST API endpoints
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── workers/        # Background tasks
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile         # Backend container
├── 📁 src/                 # React frontend
│   ├── components/         # UI components
│   ├── services/          # API integration
│   └── pages/             # Application pages
├── 📄 docker-compose.yml  # Development environment
└── 📄 package.json        # Frontend dependencies
```

### Technology Stack

#### **Backend**
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Primary database
- **Redis** - Caching and session management
- **PyMuPDF** - PDF processing and text extraction
- **pikepdf** - PDF manipulation
- **SQLAlchemy** - Database ORM

#### **Frontend**
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern UI components
- **React Query** - Server state management

### API Endpoints

#### **Job Management**
- `POST /api/v1/jobs/` - Create translation job
- `GET /api/v1/jobs/` - List jobs with pagination
- `GET /api/v1/jobs/{id}/` - Get job details
- `POST /api/v1/jobs/{id}/start` - Start job processing
- `POST /api/v1/jobs/{id}/cancel` - Cancel job

#### **File Operations**
- `POST /api/v1/upload/direct` - Upload PDF files
- `GET /api/v1/download/{id}` - Download translated PDF

#### **System**
- `GET /health` - Health check

### Testing

```bash
# Run API tests
./test-api.sh

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down
```

## 📊 Current Status

### ✅ **Phase 1 Complete**
- Full-stack application architecture
- PDF text extraction and processing
- Job management and status tracking
- Real-time UI with progress updates
- Mock translation for testing
- Database schema and API endpoints
- Docker development environment

### 🔄 **Phase 2 (In Development)**
- Google Cloud Translation integration
- Advanced text shaping with HarfBuzz
- Layout preservation and font management
- OCR support for scanned documents
- Production deployment configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

```bash
# Start development environment
./start-dev.sh

# Make changes to code

# Test your changes
./test-api.sh

# Commit and push
git add .
git commit -m "Your changes"
git push origin your-branch
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- **Repository**: https://github.com/KrxGu/InkWell_SE
- **Documentation**: See `DEVELOPMENT.md` for detailed setup instructions
- **Phase 1 Summary**: See `PHASE_1_COMPLETE.md` for implementation details

## 🛟 Support

For support and questions:
1. Check the [Documentation](DEVELOPMENT.md)
2. Review [Phase 1 Complete](PHASE_1_COMPLETE.md) for technical details
3. Open an issue on GitHub
4. Check the API documentation at http://localhost:8000/docs

---

**Built with ❤️ for seamless multilingual document translation**