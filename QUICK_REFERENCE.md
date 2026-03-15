# Enterprise CI/CD Quick Reference

## New Features at a Glance

### 🚀 Preview Environments
- Every PR gets automatic preview deployment
- Vercel preview URL in PR comment
- Reviewers can test before merging
- Automatic cleanup when PR closes

### 📦 Semantic Versioning
- Automatic version generation (v1.0.0, v1.1.0, v1.1.1)
- Based on conventional commits (feat:, fix:, chore:)
- GitHub Release with changelog
- Docker images tagged with versions

### 🔒 Security Scanning
- Trivy filesystem and image scanning
- OWASP dependency checking
- npm audit for frontend
- Maven dependency check for backend
- Pipeline fails on critical vulnerabilities

### ✅ Code Quality
- Backend: Checkstyle, SpotBugs, PMD
- Frontend: ESLint, Prettier, TypeScript
- Code coverage tracking
- Optional SonarQube integration

### 🗄️ Database Migrations
- Flyway integration
- SQL scripts in version control
- Automatic migration on deployment
- Schema version history

### 📊 Observability
- Prometheus metrics collection
- Grafana dashboards
- Loki centralized logging
- Promtail log shipping
- Spring Boot Actuator endpoints

### 💾 Caching
- Redis service
- Session management
- API response caching
- Rate limiting support

### 📚 API Documentation
- OpenAPI/Swagger integration
- Swagger UI at `/swagger-ui.html`
- Interactive API testing
- Contract validation

### 🎯 Advanced Deployments
- Blue-Green deployment ready
- Canary deployment support
- Rolling updates capability
- Automatic rollback on failure

---

## Quick Commands

### Local Development
```bash
# Start all services
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset database
docker-compose down -v
docker-compose up
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/my-feature

# Commit with conventional format
git commit -m "feat: add new feature"
git commit -m "fix: fix bug"
git commit -m "chore: maintenance"

# Push and create PR
git push origin feature/my-feature
```

### Backend Development
```bash
cd backend

# Build
mvn clean package

# Run tests
mvn test

# Code quality checks
mvn checkstyle:check spotbugs:check pmd:check

# Run locally
mvn spring-boot:run
```

### Frontend Development
```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# Build
npm run build

# Lint
npm run lint

# Type check
npm run type-check

# Tests
npm test
```

---

## Access Points

### Local Services
```
Frontend:        http://localhost:3000
Backend API:     http://localhost:8080
Swagger UI:      http://localhost:8080/swagger-ui.html
Prometheus:      http://localhost:9090
Grafana:         http://localhost:3001
Loki:            http://localhost:3100
Database:        localhost:5432
Redis:           localhost:6379
```

### GitHub
```
Actions:         https://github.com/<org>/<repo>/actions
Deployments:     https://github.com/<org>/<repo>/deployments
Releases:        https://github.com/<org>/<repo>/releases
Security:        https://github.com/<org>/<repo>/security
```

### Vercel
```
Preview:         https://preview-<pr>.vercel.app
Development:     https://dev.vercel.app
Production:      https://vercel.app
```

### Container Registry
```
Backend:         ghcr.io/<org>/<repo>/backend:tag
Frontend:        ghcr.io/<org>/<repo>/frontend:tag
```

---

## Pipeline Stages

| Stage | Trigger | Purpose |
|-------|---------|---------|
| 1. Setup | All | Detect changes |
| 2. Backend CI | Backend changes | Build & test |
| 3. Frontend CI | Frontend changes | Build & test |
| 4. Security Scan | All | Vulnerability scan |
| 5. Docker Build | All | Build images |
| 6. Semantic Release | main | Generate version |
| 7. PR Preview | PR | Deploy preview |
| 8. Dev Deploy | dev | Deploy to dev |
| 9. Prod Deploy | main | Deploy to prod |
| 10. Registry Push | main/dev | Push images |

---

## Deployment Checklist

### Before Merging
- [ ] All tests passing
- [ ] Code review approved
- [ ] Security scans passed
- [ ] No conflicts with target branch

### After Merging
- [ ] CI pipeline running
- [ ] Deployment started
- [ ] Health checks passing
- [ ] Error rate normal
- [ ] Monitoring alerts active

---

## Troubleshooting

### Services Won't Start
```bash
# Check port conflicts
lsof -i :3000

# Clean Docker
docker system prune -a
docker-compose up --build
```

### Database Connection Error
```bash
# Reset database
docker-compose down -v
docker-compose up
```

### CI Pipeline Fails
1. Check GitHub Actions logs
2. View specific job output
3. Check for missing environment variables
4. Check for dependency conflicts

### Deployment Issues
1. Check Vercel logs
2. Verify database migrations
3. Monitor error rates
4. Check monitoring dashboards

---

## Documentation

| Document | Purpose |
|----------|---------|
| `ENTERPRISE_IMPROVEMENTS.md` | Summary of all improvements |
| `docs/ENTERPRISE_ARCHITECTURE.md` | System design & architecture |
| `docs/DEPLOYMENT_GUIDE.md` | Deployment procedures |
| `docs/SETUP_GUIDE.md` | Setup instructions |
| `QUICK_REFERENCE.md` | This file |

---

## GitHub Secrets

Required secrets in GitHub Settings → Secrets:

```
VERCEL_TOKEN              - Vercel authentication
VERCEL_ORG_ID             - Vercel organization ID
VERCEL_PROJECT_ID         - Vercel project ID
SONAR_HOST_URL (optional) - SonarQube URL
SONAR_TOKEN (optional)    - SonarQube token
```

---

## Environment Variables

Create `.env` file:

```
DB_USER=appuser
DB_PASSWORD=apppassword
DB_NAME=appdb
SPRING_PROFILE=dev
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:8080
GRAFANA_PASSWORD=admin
```

---

## Commit Message Format

```
feat: add new feature
fix: fix bug
chore: maintenance
docs: documentation
style: code style
refactor: refactoring
perf: performance
test: tests
ci: CI/CD changes
```

---

## Key Metrics

### Deployment Frequency
- Target: Daily
- Measure: Deployments per day

### Lead Time
- Target: < 1 hour
- Measure: Commit to production

### Mean Time to Recovery
- Target: < 15 minutes
- Measure: Time to fix production issues

### Change Failure Rate
- Target: < 5%
- Measure: Failed deployments

---

## Support

For issues or questions:
1. Check documentation in `docs/`
2. Review GitHub Actions logs
3. Check monitoring dashboards
4. Review troubleshooting section

---

## Next Steps

1. Configure GitHub Secrets
2. Set branch protection rules
3. Create sample projects
4. Test locally with Docker Compose
5. Create feature branch and test CI
6. Deploy to development
7. Deploy to production
8. Monitor dashboards

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Next.js Documentation](https://nextjs.org/docs)
