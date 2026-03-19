#!/bin/bash
# Deployment Script for Fynza E-commerce Platform
# Usage: ./deploy.sh [environment]
# Examples:
#   ./deploy.sh dev      # Start development environment
#   ./deploy.sh prod    # Start production with nginx
#   ./deploy.sh stop    # Stop all services

set -e

ENV=${1:-dev}

echo "======================================"
echo "  Fynza Deployment Script"
echo "======================================"
echo "Environment: $ENV"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f .env ]; then
    log_warn ".env file not found. Creating from .env.example..."
    cp .env.example .env
    log_warn "Please edit .env file with your configuration before running again!"
    exit 1
fi

# Source environment variables
source .env

case $ENV in
    "dev")
        log_info "Starting development environment..."
        docker compose up -d postgres redis backend
        log_info "Services started:"
        log_info "  - Backend API: http://localhost:8080"
        log_info "  - Actuator:   http://localhost:8081/actuator/health"
        ;;

    "prod")
        log_info "Starting production environment..."
        docker compose --profile production up -d
        log_info "Services started:"
        log_info "  - Nginx:      http://localhost:80"
        log_info "  - Backend:    http://localhost:8080"
        log_info "  - Frontend:   http://localhost:3000"
        log_info "  - Prometheus: http://localhost:9090"
        log_info "  - Grafana:    http://localhost:3001"
        ;;

    "monitoring")
        log_info "Starting monitoring stack..."
        docker compose --profile monitoring up -d prometheus grafana
        log_info "Services started:"
        log_info "  - Prometheus: http://localhost:9090"
        log_info "  - Grafana:    http://localhost:3001"
        ;;

    "stop")
        log_info "Stopping all services..."
        docker compose down
        log_info "All services stopped."
        ;;

    "clean")
        log_warn "Removing all containers, volumes, and images..."
        docker compose down -v --rmi all
        log_info "Cleanup complete."
        ;;

    "logs")
        docker compose logs -f
        ;;

    "restart")
        log_info "Restarting all services..."
        docker compose restart
        log_info "All services restarted."
        ;;

    "build")
        log_info "Building all images..."
        docker compose build --no-cache
        log_info "Build complete."
        ;;

    *)
        echo "Usage: $0 {dev|prod|monitoring|stop|clean|logs|restart|build}"
        echo ""
        echo "Commands:"
        echo "  dev        - Start development environment (postgres, redis, backend)"
        echo "  prod       - Start production environment (all services + nginx)"
        echo "  monitoring - Start monitoring stack (prometheus, grafana)"
        echo "  stop       - Stop all services"
        echo "  clean      - Remove all containers, volumes, and images"
        echo "  logs       - Show logs from all services"
        echo "  restart    - Restart all services"
        echo "  build      - Build all images"
        exit 1
        ;;
esac

echo ""
log_info "Deployment complete!"
