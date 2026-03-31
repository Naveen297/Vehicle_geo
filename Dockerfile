# ==================================
# Mahindra Vehicle Geolocation App
# Multi-stage Docker Build
# ==================================

# Stage 1: Build the React application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --silent

# Copy application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production - Serve with Nginx
FROM nginx:alpine AS production

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy .env file if exists (optional)
COPY .env* /usr/share/nginx/html/ 2>/dev/null || true

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
