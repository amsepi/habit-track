-- Core tables for simple functionality
CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'binary' or 'quantitative'
    unit VARCHAR(50),          -- 'hours', 'count', etc.
    target_value INTEGER,
    color VARCHAR(7),          -- Hex color code
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE habit_entries (
    id SERIAL PRIMARY KEY,
    habit_id INTEGER REFERENCES habits(id),
    entry_date DATE NOT NULL,
    completed BOOLEAN,         -- For binary habits
    value DECIMAL(10,2),       -- For quantitative habits
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE daily_highlights (
    id SERIAL PRIMARY KEY,
    entry_date DATE NOT NULL UNIQUE,
    highlight TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert some sample data for testing
INSERT INTO habits (name, type, unit, target_value, color) VALUES
('Morning Exercise', 'binary', NULL, NULL, '#FF6B6B'),
('Read Book', 'quantitative', 'pages', 20, '#4ECDC4'),
('Drink Water', 'quantitative', 'glasses', 8, '#45B7D1'),
('Meditation', 'binary', NULL, NULL, '#96CEB4');