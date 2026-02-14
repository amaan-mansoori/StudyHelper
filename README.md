# Study Notes & Assignment Helper

A premium platform for students to share notes, get assignment help, and earn money.

## Production Setup

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local dev)
- Python 3.11+ (for local dev)

### Deployment

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Notes-Assignment-Helper
   ```

2. **Configure Environment**
   Copy `.env.example` to `.env` (optional, as docker-compose handles defaults)
   ```bash
   cp .env.example .env
   ```

3. **Run with Docker Compose**
   Build and start the services in production mode:
   ```bash
   docker compose up --build -d
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/docs (Swagger UI)

## Development

To run locally without Docker:

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Features
- **Currency**: INR (₹)
- **Security**: Strict password policy, JWT Auth, CORS protection.
- **Tech Stack**: Next.js 14, FastAPI, PostgreSQL, TailwindCSS.

## License
MIT
