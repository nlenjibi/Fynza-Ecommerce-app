# Fynza E-commerce Deployment Guide

## Quick Start

### 1. Prerequisites
- Docker & Docker Compose installed
- Git
- 2GB RAM minimum

### 2. Clone & Configure

```bash
# Clone repository
git clone <repository-url>
cd Fynza-Ecommerce-app

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Deploy

```bash
# Development (backend + database + redis)
./deploy.sh dev

# Production (with nginx reverse proxy)
./deploy.sh prod

# With monitoring (prometheus + grafana)
./deploy.sh monitoring
```

## Services & Ports

| Service | URL | Description |
|---------|-----|-------------|
| Backend API | http://localhost:8080 | Spring Boot API |
| Actuator | http://localhost:8081/actuator/health | Health checks |
| Frontend | http://localhost:3000 | Next.js app |
| Nginx | http://localhost:80 | Reverse proxy (prod) |
| PostgreSQL | localhost:5432 | Database |
| Redis | localhost:6379 | Cache |
| Prometheus | http://localhost:9090 | Metrics |
| Grafana | http://localhost:3001 | Dashboards |

## Deployment Commands

```bash
# Development environment
./deploy.sh dev

# Production environment (full stack + nginx)
./deploy.sh prod

# With monitoring stack
./deploy.sh monitoring

# View logs
./deploy.sh logs

# Stop all services
./deploy.sh stop

# Clean everything (including volumes)
./deploy.sh clean

# Rebuild images
./deploy.sh build
```

## Nginx Reverse Proxy Setup (VPS/Production)

### 1. Install Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. Configure SSL Certificates
```bash
# For Let's Encrypt
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 3. Nginx Configuration Files

Place nginx config in `/etc/nginx/sites-available/fynza`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /actuator/health {
        proxy_pass http://localhost:8081/actuator/health;
        access_log off;
    }
}
```

### 4. Enable Configuration
```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/fynza /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 5. SSL Configuration (HTTPS)
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Testing the Setup

### 1. Health Checks
```bash
# Backend health
curl http://localhost:8080/actuator/health

# Nginx health
curl http://localhost/health
```

### 2. Test API
```bash
# Test endpoints
curl -X GET http://localhost:8080/api/v1/products
curl -X GET http://localhost:8080/api/v1/categories
```

### 3. Check Logs
```bash
# View all logs
docker compose logs -f

# View specific service
docker compose logs -f backend
docker compose logs -f postgres
docker compose logs -f nginx
```

## Troubleshooting

### Database Connection Issues
```bash
# Check postgres is running
docker compose ps postgres

# View postgres logs
docker compose logs postgres

# Connect to database
docker exec -it fynza-postgres psql -U fynza_user -d fynza_ecommerce
```

### Backend Not Starting
```bash
# Check backend logs
docker compose logs backend

# Rebuild backend
docker compose build backend
docker compose up -d backend
```

### Redis Connection Issues
```bash
# Test Redis connection
docker exec -it fynza-redis redis-cli -a redis_password ping
```

### Nginx Issues
```bash
# Check nginx config
sudo nginx -t

# View nginx logs
docker compose logs nginx
cat nginx_logs/access.log
```

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| DB_USER | PostgreSQL user | fynza_user |
| DB_PASSWORD | PostgreSQL password | (set your own) |
| DB_NAME | Database name | fynza_ecommerce |
| REDIS_PASSWORD | Redis password | redis_password |
| JWT_SECRET | JWT signing key | (set your own) |
| CORS_ALLOWED_ORIGINS | Allowed origins | http://localhost:3000 |
| SPRING_PROFILE | Spring profile | prod |
| NODE_ENV | Node environment | production |

## Production Checklist

- [ ] Change all default passwords
- [ ] Generate secure JWT_SECRET (min 32 chars)
- [ ] Configure SSL certificates
- [ ] Set proper CORS origins
- [ ] Enable Redis authentication
- [ ] Configure PostgreSQL SSL
- [ ] Set up monitoring
- [ ] Configure backup strategy
- [ ] Set up log aggregation
- [ ] Enable firewall (ufw)
