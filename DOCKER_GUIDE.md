# Docker Complete Guide for Fynza E-commerce

## What is Docker?

**Docker** is a platform that lets you run applications in isolated containers. Think of it like a virtual computer inside your computer - each container has its own environment but shares the host's resources.

### Key Concepts

| Term | Meaning |
|------|---------|
| **Image** | A template/blueprint for a container (like a class in OOP) |
| **Container** | A running instance of an image (like an object in OOP) |
| **Dockerfile** | Instructions to build an image |
| **docker-compose.yml** | Instructions to run multiple containers together |
| **Volume** | Persistent storage that survives container restarts |

## Your Docker Images Explained

```
postgres:16-alpine     → Database (stores all data)
redis:7-alpine        → Cache (speeds up the app)
grafana/grafana        → Dashboards (visualize metrics)
prom/prometheus        → Metrics collector (performance data)
grafana/loki           → Log aggregator (centralized logs)
grafana/promtail       → Log shipper (sends logs to Loki)
```

## How It All Fits Together

```
┌─────────────────────────────────────────────────────────┐
│                    Your Computer                         │
│                                                         │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐  │
│  │   Backend   │   │  PostgreSQL │   │    Redis    │  │
│  │   (Java)    │◄──│  (Database) │   │   (Cache)   │  │
│  │  localhost  │   │  localhost  │   │  localhost  │  │
│  │    :8080    │   │    :5432   │   │    :6379    │  │
│  └─────────────┘   └─────────────┘   └─────────────┘  │
│        │                                      │        │
│        │          Docker Network              │        │
│        │    (containers talk to each other)   │        │
│        └──────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────┘
```

## Quick Start Commands

### 1. Check Docker Status
```bash
docker --version
docker compose version
```

### 2. View Containers
```bash
# See running containers
docker compose ps

# See ALL containers (including stopped)
docker compose ps -a
```

### 3. Start Services
```bash
# Start everything
docker compose up -d

# Start specific service
docker compose up -d postgres
docker compose up -d redis
docker compose up -d backend
```

### 4. Stop Services
```bash
# Stop everything
docker compose down

# Stop specific service
docker compose stop postgres

# Stop and remove containers
docker compose down
```

### 5. View Logs
```bash
# All logs
docker compose logs

# Specific service
docker compose logs postgres
docker compose logs redis
docker compose logs backend

# Follow logs in real-time
docker compose logs -f
```

### 6. Rebuild After Changes
```bash
# Rebuild images
docker compose build

# Rebuild specific service
docker compose build backend

# Rebuild and start
docker compose up -d --build
```

## Service Access URLs

| Service | Local URL | Container Name |
|---------|-----------|----------------|
| Backend API | http://localhost:8080 | fynza-api |
| Health Check | http://localhost:8081/actuator/health | fynza-api |
| PostgreSQL | localhost:5432 | fynza-postgres |
| Redis | localhost:6379 | fynza-redis |
| Frontend | http://localhost:3000 | fynza-frontend |

## Connect to Containers

### PostgreSQL
```bash
# Connect to database
docker exec -it fynza-postgres psql -U fynza_user -d fynza_ecommerce

# Run SQL file
docker exec -i fynza-postgres psql -U fynza_user -d fynza_ecommerce < backup.sql
```

### Redis
```bash
# Open Redis CLI
docker exec -it fynza-redis redis-cli

# In redis-cli, test connection
PING
# Should return: PONG

# View all keys
KEYS *

# Clear all keys (be careful!)
FLUSHALL
```

### Backend
```bash
# Shell into container
docker exec -it fynza-api sh

# View environment variables
docker exec -it fynza-api env

# Check Java version
docker exec -it fynza-api java -version
```

## Docker Compose Profiles

Profiles let you start specific groups of services:

```bash
# Start only core services (postgres, redis, backend)
docker compose up -d

# Start with frontend
docker compose --profile frontend up -d

# Start with monitoring (prometheus, grafana)
docker compose --profile monitoring up -d

# Start production (frontend + nginx)
docker compose --profile production up -d
```

## Common Problems & Solutions

### Problem: "Port already in use"
```bash
# Find what's using the port
netstat -ano | findstr :8080

# Kill the process or change port in docker-compose.yml
```

### Problem: Container keeps restarting
```bash
# Check logs
docker compose logs postgres

# Common fix: remove volume and restart
docker compose down -v
docker compose up -d
```

### Problem: Cannot connect to database
```bash
# Check if container is running
docker compose ps

# Check network
docker network ls
docker network inspect fynza_fynza-network

# Test connection from backend
docker exec -it fynza-api nc -zv postgres 5432
```

### Problem: Redis refuses connection
```bash
# Check Redis is running
docker compose logs redis

# Test connection
docker exec -it fynza-redis redis-cli ping

# If password protected, use:
docker exec -it fynza-redis redis-cli -a redis_password ping
```

### Problem: "No such image"
```bash
# Pull images
docker compose pull

# Or rebuild
docker compose build --no-cache
```

## Data Persistence

Data is stored in **volumes** - they survive container restarts:

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect fynza_postgres_data

# Remove volumes (deletes all data!)
docker compose down -v
```

## Environment Variables

Create a `.env` file to configure services:

```bash
# Copy example
cp .env.example .env

# Edit it
nano .env
```

Key variables:
```
DB_USER=fynza_user
DB_PASSWORD=your_secure_password
DB_NAME=fynza_ecommerce
REDIS_PASSWORD=redis_password
JWT_SECRET=your-256-bit-secret
```

## Complete Workflow

### 1. First Time Setup
```bash
# 1. Ensure Docker Desktop is running

# 2. Copy and edit environment
cp .env.example .env
nano .env  # Edit passwords!

# 3. Start services
docker compose up -d

# 4. Check status
docker compose ps

# 5. View logs
docker compose logs -f
```

### 2. Daily Development
```bash
# Start everything
docker compose up -d

# View logs
docker compose logs -f backend

# Make code changes, auto-rebuild
docker compose up -d --build backend
```

### 3. Clean Up
```bash
# Stop everything
docker compose down

# Remove everything including data
docker compose down -v

# Full reset (remove images too)
docker compose down -v --rmi all
```

## File Locations

```
Fynza-Ecommerce-app/
├── docker-compose.yml     # Service definitions
├── .env                   # Environment variables (your secrets)
├── .env.example          # Template for .env
├── nginx/
│   ├── nginx.conf        # Web server config
│   └── redis.conf        # Redis config
├── backend/
│   └── Dockerfile        # Java app build instructions
└── frontend/
    └── Dockerfile        # Next.js app build instructions
```

## Monitoring Containers

### Resource Usage
```bash
# View resource usage
docker stats

# View specific container
docker stats fynza-api
```

### Inspect Container
```bash
# See details
docker inspect fynza-postgres

# See IP address
docker inspect fynza-postgres | findstr IPAddress

# See environment variables
docker inspect fynza-api | findstr -i ENV
```

## Tips

1. **Always check logs first** when something breaks:
   ```bash
   docker compose logs service_name
   ```

2. **Use `-d` flag** to run in background (detached mode)

3. **Use `--build`** when you've made code changes

4. **Use `docker compose down -v`** only when you want to delete data

5. **Never commit `.env`** to git - it contains secrets!

## Quick Reference Card

```bash
# Start:     docker compose up -d
# Stop:      docker compose down
# Logs:      docker compose logs -f
# Rebuild:   docker compose up -d --build
# Clean:     docker compose down -v
# Shell:     docker exec -it container_name sh
# Database:  docker exec -it fynza-postgres psql -U user -d db
# Redis:     docker exec -it fynza-redis redis-cli
# Stats:     docker stats
# Inspect:   docker inspect container_name
```
