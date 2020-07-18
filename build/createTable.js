"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var pool = new _pg["default"].Pool({
  connectionString: process.env.DATABASE_URL
});
/**
 * Create Tables
 */

var createTable = function createTable() {
  var queryText = "CREATE TABLE IF NOT EXISTS\n      companies(\n        id serial PRIMARY KEY,\n        name VARCHAR(128) NOT NULL,\n        location VARCHAR(128) NOT NULL,\n        employees integer NOT NULL,\n        networth integer NOT NULL,\n        added_date TIMESTAMP,\n        modified_date TIMESTAMP\n      )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var _default = createTable;
exports["default"] = _default;