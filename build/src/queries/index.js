"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteQuery = exports.updateQuery = exports.updateFindOneQuery = exports.getCompanyQuery = exports.createCompanyQuery = exports.createTableQuery = void 0;
var createTableQuery = "CREATE TABLE IF NOT EXISTS\ncompanies(\n  id serial PRIMARY KEY,\n  name VARCHAR(128) NOT NULL,\n  location VARCHAR(128) NOT NULL,\n  employees integer NOT NULL,\n  networth integer NOT NULL,\n  added_date TIMESTAMP,\n  modified_date TIMESTAMP\n)";
exports.createTableQuery = createTableQuery;
var createCompanyQuery = "INSERT INTO\ncompanies(name, location, employees, networth, added_date, modified_date)\nVALUES($1, $2, $3, $4, $5, $6)\nreturning *";
exports.createCompanyQuery = createCompanyQuery;
var getCompanyQuery = "SELECT * FROM companies WHERE id = $1";
exports.getCompanyQuery = getCompanyQuery;
var updateFindOneQuery = "SELECT * FROM companies WHERE id=$1";
exports.updateFindOneQuery = updateFindOneQuery;
var updateQuery = "UPDATE companies\n  SET name=$1,location=$2,employees=$3,networth=$4,modified_date=$5\n  WHERE id=$6 returning *";
exports.updateQuery = updateQuery;
var deleteQuery = "DELETE FROM companies WHERE id=$1 returning *";
exports.deleteQuery = deleteQuery;