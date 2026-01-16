package handlers

import (
	"encoding/json"
	"github.com/jackc/pgx/v5/pgxpool"
	"net/http"
)

type EntryHandler struct {
	db *pgxpool.Pool
}

func NewEntryHandler(db *pgxpool.Pool) *EntryHandler {
	return &EntryHandler{db: db}
}

type CreateEntryRequest struct {
	Category    string `json:"category"`
	Description string `json:"description"`
	Mood        string `json:"mood"`
}

func (h *EntryHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req CreateEntryRequest

	// Parse JSON
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad json", http.StatusBadRequest)
		return
	}

	// Insert into db
	_, err := h.db.Exec(r.Context(),
		"INSERT INTO entries (category, description, mood) VALUES ($1, $2, $3)",
		req.Category, req.Description, req.Mood,
	)
	if err != nil {
		http.Error(w, "db error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "created"})
}
