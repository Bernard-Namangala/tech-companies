"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _queries = require("./src/queries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var pool = new _pg["default"].Pool({
  connectionString: process.env.DATABASE_URL
});

if (process.env.NODE_ENV === "development") {
  pool = new _pg["default"].Pool({
    user: "postgres",
    host: "localhost",
    database: "companies",
    password: process.env.DATABASE_PASSWORD,
    port: "5432"
  });
}
/**
 * Create Tables
 */


var createTable = function createTable() {
  pool.query(_queries.createTableQuery).then(function (res) {
    console.log("Connected to database");
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var _default = createTable;
exports["default"] = _default;