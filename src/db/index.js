import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

let pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

if (process.env.NODE_ENV === "development") {
  pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "companies",
    password: process.env.DATABASE_PASSWORD,
    port: "5432",
  });
}

export default {
  query: (text, params) => pool.query(text, params),
};
