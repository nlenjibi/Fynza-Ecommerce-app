# CI/CD Architecture Documentation

## Overview

This monorepo implements a production-grade CI/CD pipeline for a full-stack application with:
- **Backend:** Java Spring Boot microservice
- **Frontend:** Next.js web application
- **Containerization:** Docker with multi-stage builds
- **Orchestration:** Docker Compose for local development
- **Deployment:** Vercel for frontend, container registry for backend
- **CI/CD:** GitHub Actions with GitFlow branching strategy

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     Git Repository (GitHub)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   main       │  │   dev        │  │  feature/*, fix/*    │  │
│  │ (production) │  │ (integration)│  │  (development)       │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              GitHub Actions CI/CD Pipeline                       │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Stage 1: Setup & Change Detection                       │   │
│  │ - Checkout repository                                   │   │
│  │ - Detect backend/frontend changes                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│         ┌────────────────────┼────────────────────┐             │
│         ▼                    ▼                    ▼             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    │
│  │ Backend CI   │    │ Frontend CI  │    │ Docker Build │    │
│  │              │    │              │    │              │    │
│  │ • Setup Java │    │ • Setup Node │    │ • Build      │    │
│  │ • Cache Maven│    │ • Install    │    │   backend    │    │
│  │ • Build JAR  │    │ • Lint       │    │ • Build      │    │
│  │ • Run tests  │    │ • Build app  │    │   frontend   │    │
│  └──────────────┘    │ • Run tests  │    └──────────────┘    │
│                      └──────────────┘                          │
│                              │                                   │
│                              ▼                                   │
│                    ┌──────────────────┐                         │
│                    │ All checks pass? │                         │
│                    └──────────────────┘                         │
│                         │         │                             │
│                    YES  │         │  NO                         │
│                         ▼         ▼                             │
│                    ┌─────────┐  ┌──────────┐                   │
│                    │ Deploy  │  │ Fail PR  │                   │
│                    └─────────┘  └──────────┘                   │
│                         │                                       │
│         ┌───────────────┼───────────────┐                      │
│         ▼               ▼               ▼                      │
│    ┌─────────┐    ┌──────────┐    ┌──────────┐               │
│    │ dev     │    │ main     │    │ Registry │               │
│    │ branch  │    │ branch   │    │ Push     │               │
│    │         │    │          │    │          │               │
│    │ Vercel  │    │ Vercel   │    │ GHCR     │               │
│    │ Preview │    │ Prod     │    │ Images   │               │
│    └─────────┘    └──────────┘    └──────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

## Branch Strategy (GitFlow)

### Primary Branches

**main** (Production)
- Protected branch with 2 required approvals
- Automatic production deployment to Vercel
- Tagged releases created automatically
- Only merges from `dev` via PR

**dev** (Integration)
- Protected branch with 1 required approval
- Automatic preview deployment to Vercel
- Integration point for all features
- Merges from `feature/*` and `fix/*` branches

### Supporting Branches

**feature/*** (Feature Development)
- Created from: `dev`
- Merged back to: `dev`
- Naming: `feature/authentication`, `feature/payments`, etc.
- Requires 1 approval + CI pass

**fix/*** (Bug Fixes)
- Created from: `dev`
- Merged back to: `dev`
- Naming: `fix/payment-bug`, `fix/login-error`, etc.
- Requires 1 approval + CI pass

### Workflow

```
1. Developer creates feature/auth from dev
2. Commits and pushes to feature/auth
3. Creates PR: feature/auth → dev
4. CI pipeline runs (backend, frontend, docker)
5. Code review (1 approval required)
6. Merge to dev (preview deployment triggers)
7. Create PR: dev → main
8. Code review (2 approvals required)
9. Merge to main (production deployment triggers)
```

## Containerization Strategy

### Backend Dockerfile (Multi-stage)

**Build Stage:**
- Base: `maven:3.9-eclipse-temurin-17`
- Copies pom.xml and downloads dependencies
- Builds Spring Boot JAR with Maven
- Optimizes layer caching

**Runtime Stage:**
- Base: `eclipse-temurin:17-jre-alpine` (lightweight)
- Copies only the built JAR
- Exposes port 8080
- Health check via `/actuator/health`
- Reduced image size (~200MB vs 500MB+)

### Frontend Dockerfile (Multi-stage)

**Build Stage:**
- Base: `node:20-alpine`
- Installs dependencies
- Builds Next.js application
- Generates optimized production bundle

**Runtime Stage:**
- Base: `node:20-alpine`
- Installs production dependencies only
- Copies built application
- Exposes port 3000
- Health check via HTTP GET
- Reduced image size (~150MB vs 400MB+)

## Docker Compose Architecture

### Services

```yaml
postgres:
  - PostgreSQL 16 database
  - Port: 5432
  - Persistent volume: postgres_data
  - Health check: pg_isready

redis:
  - Redis 7 cache
  - Port: 6379
  - Health check: redis-cli ping

backend:
  - Spring Boot application
  - Port: 8080
  - Depends on: postgres, redis
  - Environment: DB credentials, Redis host

frontend:
  - Next.js application
  - Port: 3000
  - Depends on: backend
  - Environment: API URL
```

### Network

- **Driver:** bridge
- **Name:** app-network
- **Purpose:** Internal service-to-service communication
- **Frontend → Backend:** `http://backend:8080`
- **Backend → Database:** `jdbc:postgresql://postgres:5432/appdb`
- **Backend → Cache:** `redis://redis:6379`

## CI/CD Pipeline Stages

### Stage 1: Setup & Change Detection

**Purpose:** Determine which services need to be tested

**Actions:**
- Checkout repository with full history
- Compare current branch with main
- Output flags: `backend-changed`, `frontend-changed`

**Optimization:** Skip unnecessary jobs if only one service changed

### Stage 2: Backend CI

**Triggers:** On backend changes or workflow_dispatch

**Steps:**
1. Checkout repository
2. Setup Java 17 with Maven cache
3. Build with Maven: `mvn clean package`
4. Run tests: `mvn test`
5. Upload test results as artifacts

**Caching:** Maven dependencies cached between runs

### Stage 3: Frontend CI

**Triggers:** On frontend changes or workflow_dispatch

**Steps:**
1. Checkout repository
2. Setup Node 20 with npm cache
3. Install dependencies: `npm ci`
4. Run linter: `npm run lint`
5. Build: `npm run build`
6. Run tests: `npm test -- --run`
7. Upload build artifacts

**Caching:** node_modules cached between runs

### Stage 4: Docker Build Validation

**Triggers:** After backend and frontend CI pass

**Steps:**
1. Setup Docker Buildx
2. Build backend image (no push)
3. Build frontend image (no push)

**Purpose:** Ensure Dockerfiles are valid before deployment

### Stage 5: Development Deployment

**Triggers:** Push to dev branch

**Steps:**
1. Deploy frontend to Vercel preview environment
2. Comment on PR with deployment URL
3. Tag deployment as "development"

**Environment:** Preview deployment on Vercel

### Stage 6: Production Deployment

**Triggers:** Push to main branch

**Steps:**
1. Create semantic version tag
2. Deploy frontend to Vercel production
3. Create GitHub Release
4. Tag release with version number

**Environment:** Production deployment on Vercel

### Stage 7: Container Registry Push

**Triggers:** Push to main or dev branch

**Steps:**
1. Login to GitHub Container Registry (GHCR)
2. Extract metadata (branch, SHA, semver)
3. Build and push backend image
4. Build and push frontend image

**Registry:** ghcr.io (GitHub Container Registry)

**Tags:**
- Branch: `dev`, `main`
- Commit SHA: `dev-abc123def`
- Semantic version: `v1.0.0`

## Branch Protection Rules

### dev Branch

- Require PR before merge
- Require 1 approval
- Require CI pass (backend-ci, frontend-ci, docker-build)
- Require branch up-to-date
- Dismiss stale approvals

### main Branch

- Require PR before merge
- Require 2 approvals
- Require CI pass (backend-ci, frontend-ci, docker-build)
- Require branch up-to-date
- Require signed commits
- Dismiss stale approvals
- Include administrators

## Deployment Strategy

### Development (dev branch)

**Trigger:** Merge to dev

**Process:**
1. CI pipeline runs
2. Frontend deploys to Vercel preview
3. Backend image pushed to registry (optional)
4. Preview URL available in PR

**Rollback:** Revert commit and push

### Production (main branch)

**Trigger:** Merge to main

**Process:**
1. CI pipeline runs
2. Semantic version tag created
3. Frontend deploys to Vercel production
4. GitHub Release created
5. Backend image pushed to registry with version tag

**Rollback:** Revert commit, push, and redeploy

## Security Considerations

### Secrets Management

- **VERCEL_TOKEN:** Vercel authentication
- **VERCEL_ORG_ID:** Vercel organization
- **VERCEL_PROJECT_ID:** Vercel project
- **GITHUB_TOKEN:** Automatic (provided by GitHub)

**Storage:** GitHub Secrets (encrypted)

**Access:** Only available to workflows on protected branches

### Branch Protection

- Prevents direct commits to main/dev
- Requires code review before merge
- Enforces CI pipeline success
- Requires branch up-to-date
- Protects against accidental deployments

### Container Security

- Multi-stage builds reduce attack surface
- Alpine base images minimize vulnerabilities
- No secrets in Dockerfiles
- Health checks ensure service availability
- Read-only root filesystem (optional)

## Performance Optimizations

### Docker Build

- Multi-stage builds reduce final image size
- Layer caching optimizes rebuild time
- Alpine base images (~5MB vs 100MB+)
- Dependency caching in Dockerfile

### CI Pipeline

- Parallel job execution (backend, frontend, docker)
- Change detection skips unnecessary jobs
- Artifact caching (Maven, npm)
- Conditional job execution

### Docker Compose

- Service health checks prevent race conditions
- Depends_on with condition: service_healthy
- Volume persistence for database
- Network isolation for security

## Monitoring & Observability

### Health Checks

**Backend:** `GET /actuator/health` (Spring Boot Actuator)

**Frontend:** `GET http://localhost:3000` (HTTP GET)

**Database:** `pg_isready` (PostgreSQL)

**Cache:** `redis-cli ping` (Redis)

### Logs

- Docker Compose: `docker-compose logs <service>`
- GitHub Actions: View in workflow run details
- Vercel: Dashboard and deployment logs

### Artifacts

- Backend test results: `backend/target/surefire-reports/`
- Frontend build: `frontend/.next/`
- Docker images: GitHub Container Registry

## Scaling Considerations

### Horizontal Scaling

- Frontend: Vercel handles auto-scaling
- Backend: Deploy multiple instances behind load balancer
- Database: Connection pooling via Spring Boot
- Cache: Redis cluster for high availability

### Vertical Scaling

- Increase container resource limits
- Optimize database queries
- Cache frequently accessed data
- Use CDN for static assets

## Disaster Recovery

### Backup Strategy

- Database: Automated backups (configure in docker-compose)
- Code: Git repository (GitHub)
- Artifacts: GitHub Actions artifacts (90 days)

### Recovery Procedures

1. **Database failure:** Restore from backup
2. **Deployment failure:** Revert commit and redeploy
3. **Service failure:** Restart container via Docker Compose
4. **Complete outage:** Redeploy from main branch

## Cost Optimization

- Use Alpine base images (smaller, faster)
- Implement layer caching (fewer rebuilds)
- Conditional job execution (skip unnecessary jobs)
- Vercel free tier for preview deployments
- GitHub Actions free tier (2000 minutes/month)

## Future Enhancements

- [ ] Implement Kubernetes deployment
- [ ] Add automated security scanning (Snyk, Trivy)
- [ ] Implement blue-green deployments
- [ ] Add performance benchmarking
- [ ] Implement canary deployments
- [ ] Add automated rollback on failure
- [ ] Implement feature flags
- [ ] Add distributed tracing (Jaeger, Zipkin)
