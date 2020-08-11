"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = _interopRequireDefault(require("../controllers"));

require("core-js/stable");

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
var companiesController = _controllers["default"].companiesController;
var createCompany = companiesController.createCompany,
    updateCompany = companiesController.updateCompany,
    deleteCompany = companiesController.deleteCompany,
    listCompanies = companiesController.listCompanies,
    getCompany = companiesController.getCompany;
router.get("/", _controllers["default"].indexController);
router.post("/create-company", createCompany);
router.put("/update-company/:id", updateCompany);
router["delete"]("/delete-company/:id", deleteCompany);
router.get("/list-companies", listCompanies);
router.get("/get-company/:id", getCompany);
var _default = router;
exports["default"] = _default;