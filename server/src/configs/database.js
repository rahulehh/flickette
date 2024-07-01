import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

let { CONNECTION_STRING } = process.env;

const db = new pg.Client({
  connectionString: CONNECTION_STRING,
});

export default db;
