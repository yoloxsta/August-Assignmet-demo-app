# build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# runtime
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
