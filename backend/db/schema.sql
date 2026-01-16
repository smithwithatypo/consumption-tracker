CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    mood VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);
