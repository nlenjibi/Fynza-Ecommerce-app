# Quick Start Guide

## 5-Minute Setup

### 1. Clone & Setup
```bash
git clone <repo-url>
cd <repo-name>
cp .env.example .env
```

### 2. Start Services
```bash
docker-compose up --build
```

### 3. Access Application
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Database: localhost:5432

## Common Commands

### Docker Compose

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# Rebuild images
docker-compose up --build

# Remove volumes (reset database)
docker-compose down -v
```

### Git Workflow

```bash
# Create feature branch
git checkout dev
git pull origin dev
git checkout -b feature/my-feature

# Commit changes
git add .
git commit -m "feat: description"
git push origin feature/my-feature

# Create PR on GitHub
# → Request review
# → Wait for CI to pass
# → Merge to dev

# Create production PR
git checkout dev
git pull origin dev
git checkout -b release/v1.0.0
git push origin release/v1.0.0
# → Create PR: release/v1.0.0 → main
# → Get 2 approvals
# → Merge to main
```

### Backend Development

```bash
# Build
cd backend
mvn clean package

# Run locally
mvn spring-boot:run

# Run tests
mvn test

# View logs
docker-compose logs -f backend
```

### Frontend Development

```bash
# Install dependencies
cd frontend
npm install

# Development server
npm run dev

# Build
npm run build

# Run production build
npm start

# View logs
docker-compose logs -f frontend
```

## Troubleshooting

### Services won't start
```bash
# Check if ports are in use
lsof -i :3000
lsof -i :8080
lsof -i :5432

# Kill process
kill -9 <PID>

# Clean Docker
docker system prune -a
docker-compose up --build
```

### Database connection error
```bash
# Check database is running
docker-compose ps

# View database logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up
```

### Frontend can't reach backend
```bash
# Verify backend is running
curl http://localhost:8080

# Check NEXT_PUBLIC_API_URL in .env
cat .env | grep API_URL

# Restart frontend
docker-compose restart frontend
```

## GitHub Secrets Setup

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - `VERCEL_TOKEN`: Get from Vercel dashboard
   - `VERCEL_ORG_ID`: Get from Vercel dashboard
   - `VERCEL_PROJECT_ID`: Get from Vercel dashboard

## Branch Protection Setup

1. Go to **Settings** → **Branches**
2. Add rule for `dev`:
   - Require 1 approval
   - Require CI pass
3. Add rule for `main`:
   - Require 2 approvals
   - Require CI pass
   - Require signed commits

## CI/CD Pipeline Status

- Check PR for status checks
- View full logs: Click "Details" on failed check
- GitHub Actions tab: See all workflow runs

## Deployment

### Preview (dev branch)
- Automatic on merge to dev
- Vercel preview URL in PR

### Production (main branch)
- Automatic on merge to main
- Vercel production URL
- GitHub Release created

## Performance Tips

- Use `docker-compose up -d` to run in background
- Cache Docker layers: `export DOCKER_BUILDKIT=1`
- Use `.dockerignore` to exclude files
- Monitor with: `docker stats`

## Security Reminders

- Never commit `.env` with real secrets
- Use GitHub Secrets for sensitive data
- Enable branch protection rules
- Require code reviews
- Sign commits with GPG

## Need Help?

- See `DEVELOPMENT.md` for detailed setup
- See `ARCHITECTURE.md` for system design
- Check GitHub Actions logs for CI/CD issues
- View Docker logs: `docker-compose logs`
