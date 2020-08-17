"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

var _moment = _interopRequireDefault(require("moment"));

var _queries = require("../queries");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var companiesController = {
  /**
   * creates a new company
   * @param {object} request
   * @param {object} response
   * @returns {object} created company
   */
  createCompany: function createCompany(request, response) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _request$body, name, location, employees, networth, values, _yield$db$query, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _request$body = request.body, name = _request$body.name, location = _request$body.location, employees = _request$body.employees, networth = _request$body.networth;

              if (!(!name || !location || !employees || !networth)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", response.status(400).send({
                error: "All fields are required to create a company 'name, location, number of employees and companies networth'"
              }));

            case 3:
              values = [name, location, employees, networth, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 4;
              _context.next = 7;
              return _db["default"].query(_queries.createCompanyQuery, values);

            case 7:
              _yield$db$query = _context.sent;
              rows = _yield$db$query.rows;
              return _context.abrupt("return", response.status(201).send(rows[0]));

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);
              return _context.abrupt("return", response.status(400).send(_context.t0));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 12]]);
    }))();
  },

  /**
   * gets a list of all companies or filters them by location if location is provided
   * @param {object} request
   * @param {object} response
   * @returns {object} list of companies
   */
  listCompanies: function listCompanies(request, response) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$db$query2, rows, rowCount, companies;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _db["default"].query(_queries.listCompaniesQuery);

            case 3:
              _yield$db$query2 = _context2.sent;
              rows = _yield$db$query2.rows;
              rowCount = _yield$db$query2.rowCount;
              companies = (0, _utils.filterCompanies)(rows, request.query);
              return _context2.abrupt("return", response.status(200).send({
                companies: companies
              }));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", response.status(400).send(_context2.t0));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 10]]);
    }))();
  },

  /**
   * gets a company with a specific id
   * @param {object} request
   * @param {object} response
   * @returns {object} company with specific id
   */
  getCompany: function getCompany(request, response) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _yield$db$query3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _db["default"].query(_queries.getCompanyQuery, [request.params.id]);

            case 3:
              _yield$db$query3 = _context3.sent;
              rows = _yield$db$query3.rows;

              if (rows[0]) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", response.status(404).send({
                error: "Company not found"
              }));

            case 7:
              return _context3.abrupt("return", response.status(200).send(rows[0]));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", response.status(400).send(_context3.t0));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 10]]);
    }))();
  },

  /**
   * Update a Companies info
   * @param {object} request
   * @param {object} response
   * @returns {object} updated company
   */
  updateCompany: function updateCompany(request, response) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _request$body2, name, location, employees, networth, _yield$db$query4, rows, values, updated;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _request$body2 = request.body, name = _request$body2.name, location = _request$body2.location, employees = _request$body2.employees, networth = _request$body2.networth;
              _context4.prev = 1;
              _context4.next = 4;
              return _db["default"].query(_queries.updateFindOneQuery, [request.params.id]);

            case 4:
              _yield$db$query4 = _context4.sent;
              rows = _yield$db$query4.rows;

              if (rows[0]) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", response.status(404).send({
                error: "Company not found"
              }));

            case 8:
              values = [name || rows[0].name, location || rows[0].location, employees || rows[0].employees, networth || rows[0].networth, (0, _moment["default"])(new Date()), request.params.id];
              _context4.next = 11;
              return _db["default"].query(_queries.updateQuery, values);

            case 11:
              updated = _context4.sent;
              return _context4.abrupt("return", response.status(200).send(updated.rows[0]));

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", response.status(400).send(_context4.t0));

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 15]]);
    }))();
  },

  /**
   * Deletes a company with specifc id
   * @param {object} request
   * @param {object} response
   * @returns {void} return status code 204 to indicate successful deletion
   */
  deleteCompany: function deleteCompany(request, response) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _yield$db$query5, rows;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _db["default"].query(_queries.deleteQuery, [request.params.id]);

            case 3:
              _yield$db$query5 = _context5.sent;
              rows = _yield$db$query5.rows;

              if (rows[0]) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", response.status(404).send({
                error: "company not found"
              }));

            case 7:
              return _context5.abrupt("return", response.status(204).send({
                success: "company deleted successfully"
              }));

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", response.status(400).send(_context5.t0));

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 10]]);
    }))();
  }
};
var _default = companiesController;
exports["default"] = _default;