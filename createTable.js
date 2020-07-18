import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "companies",
  password: process.env.DATABASE_PASSWORD,
  port: "5432",
});

/**
 * Create Tables
 */
const createTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      companies(
        id serial PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        employees integer NOT NULL,
        networth integer NOT NULL,
        added_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

export default createTable;
