package main

import (
	"context"
	"github.com/jackc/pgx/v5/pgxpool"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	"github.com/smithwithatypo/consumption-tracker/internal/handlers"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Get connection string from env
	environment := os.Getenv("ENVIRONMENT")
	dbURL := ""

	switch environment {
	case "development":
		dbURL = os.Getenv("DATABASE_PUBLIC_URL")
	case "production":
		dbURL = os.Getenv("DATABASE_URL")
	default:
		dbURL = ""
	}

	if dbURL == "" {
		log.Fatal("DATABASE_URL not set")
	}

	// Create pool (like a bucket of open connections)
	pool, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		log.Fatal("can't connect to db:", err)
	}
	defer pool.Close()

	// Test it works
	if err := pool.Ping(context.Background()); err != nil {
		log.Fatal("can't ping db:", err)
	}
	log.Println("✓ database connected")

	// Pass pool to your handler
	entryHandler := handlers.NewEntryHandler(pool)

	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	}))

	// Test route
	r.Get("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ok"))
	})

	// Routes
	// r.Post("/api/summarize", handlers.SummarizeJobDescription)
	r.Post("/api/entries", entryHandler.Create)

	// Server
	// http.ListenAndServe(":8080", r)  // deprecated in favor of railway support below
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // fallback for local dev
	}

	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatal(err)
	}
}
