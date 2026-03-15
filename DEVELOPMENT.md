# Development Setup Guide

This guide covers local development setup, Docker Compose usage, and CI/CD pipeline configuration.

## Prerequisites

- Docker & Docker Compose (v3.9+)
- Java 17 (for local backend development)
- Node.js 20 (for local frontend development)
- Git with GitFlow workflow
- GitHub CLI (optional, for managing PRs)

## Local Development with Docker Compose

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Start all services:**
   ```bash
   docker-compose up --build
   ```

   This starts:
   - PostgreSQL database (port 5432)
   - Redis cache (port 6379)
   - Spring Boot backend (port 8080)
   - Next.js frontend (port 3000)

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Database: localhost:5432

### Stopping Services

```bash
docker-compose down
```

To remove volumes (database data):
```bash
docker-compose down -v
```

## Local Development Without Docker

### Backend Setup

```bash
cd backend

# Build
mvn clean package

# Run
mvn spring-boot:run
```

Backend runs on http://localhost:8080

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev
```

Frontend runs on http://localhost:3000

## Git Workflow (GitFlow)

### Creating a Feature Branch

```bash
# Update dev branch
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push to remote
git push origin feature/your-feature-name
```

### Creating a Pull Request

1. Push your branch to GitHub
2. Go to the repository on GitHub
3. Click "New Pull Request"
4. Select `feature/your-feature-name` → `dev`
5. Add description and request reviewers
6. Wait for CI pipeline to pass
7. Request code review (minimum 1 approval for dev)

### Merging to Production

1. Create PR from `dev` → `main`
2. Wait for CI pipeline to pass
3. Get 2 code review approvals
4. Merge to main
5. Production deployment triggers automatically

## CI/CD Pipeline

### Pipeline Stages

1. **Setup** - Detect which services changed
2. **Backend CI** - Build, test, and validate Spring Boot
3. **Frontend CI** - Install, lint, build, and test Next.js
4. **Docker Build** - Validate Docker images build successfully
5. **Dev Deployment** - Deploy preview to Vercel (on dev branch)
6. **Production Deployment** - Deploy to Vercel production (on main branch)
7. **Registry Push** - Push images to GitHub Container Registry

### Required GitHub Secrets

Configure in **Settings** → **Secrets and variables** → **Actions**:

```
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<your-vercel-org-id>
VERCEL_PROJECT_ID=<your-vercel-project-id>
```

### Viewing Pipeline Status

- Check status in PR: Look for status checks below the PR description
- View full logs: Click "Details" on any failed check
- GitHub Actions tab: See all workflow runs

## Docker Compose Services

### PostgreSQL

- **Port:** 5432
- **User:** appuser (configurable via .env)
- **Password:** apppassword (configurable via .env)
- **Database:** appdb (configurable via .env)

Health check: `pg_isready`

### Redis

- **Port:** 6379
- **Health check:** `redis-cli ping`

### Spring Boot Backend

- **Port:** 8080
- **Environment variables:**
  - `SPRING_DATASOURCE_URL`: PostgreSQL connection
  - `SPRING_DATASOURCE_USERNAME`: DB user
  - `SPRING_DATASOURCE_PASSWORD`: DB password
  - `SPRING_REDIS_HOST`: Redis host
  - `SPRING_REDIS_PORT`: Redis port
  - `SPRING_PROFILES_ACTIVE`: Active profile (dev/prod)

Health check: `GET /actuator/health`

### Next.js Frontend

- **Port:** 3000
- **Environment variables:**
  - `NEXT_PUBLIC_API_URL`: Backend API URL
  - `NODE_ENV`: Environment (development/production)

Health check: `GET http://localhost:3000`

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3000  # or :8080, :5432, :6379

# Kill process
kill -9 <PID>
```

### Docker Build Fails

```bash
# Clean up Docker
docker system prune -a

# Rebuild
docker-compose up --build
```

### Database Connection Issues

```bash
# Check database is running
docker-compose ps

# View logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up
```

### Frontend Can't Connect to Backend

- Verify backend is running: `curl http://localhost:8080`
- Check `NEXT_PUBLIC_API_URL` in .env
- Ensure frontend is using correct API URL

## Performance Tips

- Use `.dockerignore` to exclude unnecessary files
- Cache Docker layers by ordering Dockerfile commands
- Use Alpine images for smaller container sizes
- Enable Docker BuildKit: `export DOCKER_BUILDKIT=1`

## Security Best Practices

- Never commit `.env` files with real secrets
- Use GitHub Secrets for sensitive data
- Rotate Vercel tokens regularly
- Enable branch protection rules
- Require code reviews before merging
- Sign commits with GPG keys

## Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Next.js Documentation](https://nextjs.org/docs)
