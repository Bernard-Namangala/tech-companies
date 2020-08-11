import pg from "pg";
import dotenv from "dotenv";
import { createTableQuery } from "./src/queries";

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

/**
 * Create Tables
 */
const createTable = () => {
  pool
    .query(createTableQuery)
    .then((res) => {
      console.log("Connected to database");
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

export default createTable;
