DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Cellphone;
DROP TABLE IF EXISTS Brand;

CREATE TABLE Brand (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE Country (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE Cellphone (
    id SERIAL PRIMARY KEY,
    asin TEXT UNIQUE NOT NULL,
    brand_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    image TEXT NOT NULL,
    rating REAL NOT NULL DEFAULT 0,
    reviewUrl TEXT NOT NULL,
    totalRatings INTEGER NOT NULL,
    price REAL NOT NULL,
    originalPrice REAL NOT NULL,
    CONSTRAINT brand_fk FOREIGN KEY(brand_id) REFERENCES Brand(id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT rating_check CHECK(rating >=0),
    CONSTRAINT totalratings_check CHECK(totalRatings >=0),
    CONSTRAINT price_check CHECK(price >=0 AND originalPrice >= 0)
);

CREATE TABLE Review (
    id SERIAL PRIMARY KEY,
    cellphone_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    rating INT NOT NULL,
    date DATE NOT NULL,
    verified BOOLEAN NOT NULL,
    title TEXT,
    body TEXT,
    helpfulVotes INTEGER NOT NULL DEFAULT 0,
    country_id INT NOT NULL,
    CONSTRAINT cellphone_fk FOREIGN KEY(cellphone_id) REFERENCES Cellphone(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT rating_check CHECK(rating >=0),
    CONSTRAINT votes_check CHECK(helpfulVotes >=0),
    CONSTRAINT country_fk FOREIGN KEY(country_id) REFERENCES Country(id) ON DELETE CASCADE ON UPDATE CASCADE
);