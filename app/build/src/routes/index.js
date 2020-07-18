"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = _interopRequireDefault(require("../controllers/"));

require("core-js/stable");

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.get("/", _controllers["default"].indexController);
router.post("/create-company", _controllers["default"].companiesController.create_company);
router.post("/update-company/:id", _controllers["default"].companiesController.update_company);
router.post("/delete-company/:id", _controllers["default"].companiesController.delete_company);
router.get("/list-companies", _controllers["default"].companiesController.list_companies);
router.get("/get-company/:id", _controllers["default"].companiesController.getCompany);
var _default = router;
exports["default"] = _default;