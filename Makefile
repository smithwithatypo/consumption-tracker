.PHONY: dev frontend backend build deploy

dev:
	cd frontend && npm run dev & cd backend && go run .

frontend:
	cd frontend && npm run dev

backend:
	cd backend && go run .

build:
	cd frontend && npm run build

deploy: build
	cd backend && railway up
