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
var _default = {
  query: function query(text, params) {
    return pool.query(text, params);
  }
};
exports["default"] = _default;