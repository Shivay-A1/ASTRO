# Production Deployment Guide

## Building for Production

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Start the production server:**
   ```bash
   npm start
   ```

The production server will run on port 3000 by default.

## Production Optimizations Applied

- ✅ Removed `X-Powered-By` header (Next.js branding removed)
- ✅ Enabled compression
- ✅ Enabled React Strict Mode
- ✅ SWC minification enabled
- ✅ Image optimization with AVIF and WebP formats
- ✅ Standalone output for better deployments
- ✅ TypeScript/ESLint errors only ignored in development

## Environment Variables

Make sure to set up the following environment variables for production:

- AI/Genkit configuration variables
- Any API keys required for services
- Database connection strings (if applicable)

## Docker Deployment (Optional)

If using the standalone output, you can create a Dockerfile:

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## Port Configuration

- Development: Port 9002
- Production: Port 3000

To change the production port, modify the `start` script in `package.json`.

