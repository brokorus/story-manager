CREATE TABLE characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    backstory TEXT,
    emotional_state TEXT
);

CREATE TABLE scenes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    continuity_notes TEXT,
    associated_characters TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE continuity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    scene_id INTEGER REFERENCES scenes(id),
    character_id INTEGER REFERENCES characters(id),
    status TEXT,
    notes TEXT
);
