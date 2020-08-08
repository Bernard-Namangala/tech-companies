export const createTableQuery = `CREATE TABLE IF NOT EXISTS
companies(
  id serial PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  location VARCHAR(128) NOT NULL,
  employees integer NOT NULL,
  networth integer NOT NULL,
  added_date TIMESTAMP,
  modified_date TIMESTAMP
)`;

export const createCompanyQuery = `INSERT INTO
companies(name, location, employees, networth, added_date, modified_date)
VALUES($1, $2, $3, $4, $5, $6)
returning *`;

export const getCompanyQuery = `SELECT * FROM companies WHERE id = $1`;

export const updateFindOneQuery = "SELECT * FROM companies WHERE id=$1";

export const updateQuery = `UPDATE companies
  SET name=$1,location=$2,employees=$3,networth=$4,modified_date=$5
  WHERE id=$6 returning *`;

export const deleteQuery = "DELETE FROM companies WHERE id=$1 returning *";
