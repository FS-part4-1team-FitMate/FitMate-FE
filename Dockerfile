# Use the official Node.js LTS image for building
FROM node:lts AS builder

# Set working directory
WORKDIR /app

ARG NEXT_PUBLIC_KAKAO_API_KEY

ENV NEXT_PUBLIC_API_URL="https://fitmate-be.asia"
ENV NODE_ENV=production
ENV NEXT_PUBLIC_KAKAO_API_KEY=$NEXT_PUBLIC_KAKAO_API_KEY

# Install dependencies (only production deps for runtime)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the Next.js app
RUN npm run build

# Use a minimal runtime image
FROM node:lts AS runtime

# Create a non-root user
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory
WORKDIR /app

# pm2 글로벌 설치
RUN npm install -g pm2

# Copy necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Ensure correct permissions
# RUN chown -R appuser:appgroup /app

# Switch to non-root user
# USER appuser

# 환경 변수 설정
ENV NEXT_PUBLIC_API_URL="https://fitmate-be.asia"
ENV NODE_ENV=production
ENV PORT=3001

# Expose application port
EXPOSE 3001

# Define runtime command
CMD ["pm2-runtime", "start", "npm", "--", "start"]
