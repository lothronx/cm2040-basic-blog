-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

------------------------- START OF MY CODE -------------------------

-- Table 1: blog information
CREATE TABLE IF NOT EXISTS blog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    password TEXT
);

-- Table 2: articles information
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    published_at TEXT,
    last_modified_at TEXT DEFAULT CURRENT_TIMESTAMP,
    published INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT NOT NULL
);

-- Table 3: comments information
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    article_id INTEGER NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE ON UPDATE CASCADE
);

--insert some default data for demonstration
INSERT INTO blog VALUES (1, "Lewis Carroll", "Alice's Wonderland", "All in the golden afternoon...", NULL);
INSERT INTO articles VALUES (1, "2023-07-01 00:00:00", "2023-07-01 00:00:00", "2023-07-01 00:00:00", 1, 0, "My First Article", "This is the subtitle of my first article.", "This is the content of my first article.");
INSERT INTO articles VALUES (2, "2023-07-02 00:00:00", "2023-07-02 00:00:00", "2023-07-02 00:00:00", 1, 0, "My Second Article", "This is the subtitle of my second article.", "This is the content of my second article.");
INSERT INTO articles VALUES (3, "2023-07-03 00:00:00", NULL, "2023-07-03 00:00:00", 0, 0, "My Draft", "This is my draft.", "This is the content of my draft.");
INSERT INTO comments VALUES (1, "2023-07-03 00:00:00", "Well written.", 1);
INSERT INTO comments VALUES (2, "2023-07-03 01:00:00", "I like it.", 1);

------------------------- END OF MY CODE -------------------------

COMMIT;

