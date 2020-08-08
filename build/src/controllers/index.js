"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _indexController = _interopRequireDefault(require("./indexController"));

var _companiesController = _interopRequireDefault(require("./companiesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  indexController: _indexController["default"],
  companiesController: _companiesController["default"]
};
exports["default"] = _default;