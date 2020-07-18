"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _routes = _interopRequireDefault(require("./src/routes"));

var _createTable = _interopRequireDefault(require("./createTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// dotenv to be used to acces environmental variables
_dotenv["default"].config(); // creating database tables


(0, _createTable["default"])();
var app = (0, _express["default"])();
app.use(_express["default"].json());
var port = process.env.PORT || 3000;
app.use("/", _routes["default"]);
app.listen(port, function () {
  console.log("app running on port ", port);
});