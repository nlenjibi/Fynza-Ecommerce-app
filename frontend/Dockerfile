# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; else npm ci; fi

# Copy source code
COPY . .

# Build Next.js application
RUN npm run build || yarn build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* yarn.lock* ./

# Install production dependencies only
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile --production; else npm ci --production; fi

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY next.config.js* ./

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Run Next.js application
CMD ["npm", "start"]
