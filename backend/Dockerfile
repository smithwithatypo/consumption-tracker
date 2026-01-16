FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM golang:1.24-alpine AS backend-builder
WORKDIR /app
COPY backend/go.* ./
RUN go mod download
COPY backend/ ./
COPY --from=frontend-builder /app/dist ./static
RUN go build -o bin/server main.go

FROM alpine:latest
WORKDIR /app
COPY --from=backend-builder /app/bin/server ./bin/server
COPY --from=backend-builder /app/static ./static
EXPOSE 8080
CMD ["./bin/server"]

