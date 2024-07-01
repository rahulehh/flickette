import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

let { CONNECTION_STRING } = process.env;

const db = new pg.Client({
  connectionString: CONNECTION_STRING,
});

(async () => {
  try {
    await db.connect();

    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR (48) PRIMARY KEY,
        email VARCHAR (255) UNIQUE,
        name VARCHAR (64),
        username VARCHAR (50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        bio TEXT
      );
    `);
    console.log("Users table created");

    await db.query(`
      CREATE TABLE IF NOT EXISTS movies (
        imdb_id VARCHAR (16) PRIMARY KEY,
        title TEXT NOT NULL,
        year VARCHAR (10) NOT NULL,
        poster_url TEXT
      );
    `);
    console.log("Movies table created");

    await db.query(`
      CREATE TABLE IF NOT EXISTS logs (
        id SERIAL PRIMARY KEY,
        imdb_id VARCHAR (16) REFERENCES movies(imdb_id) NOT NULL,
        user_id VARCHAR (48) REFERENCES users(user_id) NOT NULL,
        review TEXT,
        log_date TIMESTAMP NOT NULL
      );
    `);
    console.log("Logs table created");
  } catch (err) {
    console.error("Error setting up the database:", err);
  } finally {
    await db.end();
  }
})();
