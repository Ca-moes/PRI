DROP TABLE IF EXISTS Brand;
DROP TABLE IF EXISTS Cellphone;
DROP TABLE IF EXISTS Review;

CREATE TABLE Brand (
    id  INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE Cellphone (
    id INTEGER PRIMARY KEY,
    asin TEXT UNIQUE NOT NULL,
    brand INTEGER NOT NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    img TEXT NOT NULL,
    rating REAL NOT NULL DEFAULT 0,
    reviewUrl TEXT NOT NULL,
    totalRatings INTEGER NOT NULL,
    price REAL NOT NULL,
    originalPrice REAL NOT NULL,
    CONSTRAINT brand_fk FOREIGN KEY (brand) REFERENCES Brand (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT price_check CHECK (price <= originalPrice AND price >=0 AND originalPrice >= 0)
);

CREATE TABLE Review (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    rating INT NOT NULL,
    date TEXT NOT NULL,
    verified INTEGER NOT NULL DEFAULT 0,
    title TEXT,
    body TEXT,
    helpfulVotes INTEGER NOT NULL DEFAULT 0,
    country TEXT NOT NULL,
    cellphone_id INTEGER NOT NULL,
    CONSTRAINT asin_fk FOREIGN KEY (cellphone_id) REFERENCES Cellphone (id) ON DELETE CASCADE ON UPDATE CASCADE
);