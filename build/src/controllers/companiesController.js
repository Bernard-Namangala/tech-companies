"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

var _moment = _interopRequireDefault(require("moment"));

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
  create_company: function create_company(request, response) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var query, values, _yield$db$query, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!request.body.name || !request.body.location || !request.body.employees || !request.body.networth)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", response.status(400).send({
                error: "All fields are required to create a company 'name, location, number of employees and companies networth' "
              }));

            case 2:
              query = "INSERT INTO\n          companies(name, location, employees, networth, added_date, modified_date)\n          VALUES($1, $2, $3, $4, $5, $6)\n          returning *";
              values = [request.body.name, request.body.location, request.body.employees, request.body.networth, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 4;
              _context.next = 7;
              return _db["default"].query(query, values);

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
  list_companies: function list_companies(request, response) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var query, location_filter, _yield$db$query2, rows, rowCount, _yield$db$query3, _rows, _rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              query = "SELECT * FROM companies";
              location_filter = null; // if user has got a location filter

              if (request.query.location !== undefined) {
                location_filter = request.query.location;
                query = "SELECT * FROM companies WHERE lower(location)=lower($1)";
              }

              if (!(location_filter === null)) {
                _context2.next = 18;
                break;
              }

              _context2.prev = 4;
              _context2.next = 7;
              return _db["default"].query(query);

            case 7:
              _yield$db$query2 = _context2.sent;
              rows = _yield$db$query2.rows;
              rowCount = _yield$db$query2.rowCount;
              return _context2.abrupt("return", response.status(200).send({
                rows: rows,
                rowCount: rowCount
              }));

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](4);
              return _context2.abrupt("return", response.status(400).send(_context2.t0));

            case 16:
              _context2.next = 30;
              break;

            case 18:
              _context2.prev = 18;
              _context2.next = 21;
              return _db["default"].query(query, [location_filter]);

            case 21:
              _yield$db$query3 = _context2.sent;
              _rows = _yield$db$query3.rows;
              _rowCount = _yield$db$query3.rowCount;
              return _context2.abrupt("return", response.status(200).send({
                rows: _rows,
                rowCount: _rowCount
              }));

            case 27:
              _context2.prev = 27;
              _context2.t1 = _context2["catch"](18);
              return _context2.abrupt("return", response.status(400).send(_context2.t1));

            case 30:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 13], [18, 27]]);
    }))();
  },

  /**
   * gets a company with a specific id
   * @param {object} request
   * @param {object} response
   * @returns {object} company with specific id
   */
  getCompany: function getCompany(request, reesponse) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var text, _yield$db$query4, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              text = "SELECT * FROM companies WHERE id = $1";
              _context3.prev = 1;
              _context3.next = 4;
              return _db["default"].query(text, [request.params.id]);

            case 4:
              _yield$db$query4 = _context3.sent;
              rows = _yield$db$query4.rows;

              if (rows[0]) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", reesponse.status(404).send({
                error: "Company not found"
              }));

            case 8:
              return _context3.abrupt("return", reesponse.status(200).send(rows[0]));

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", reesponse.status(400).send(_context3.t0));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 11]]);
    }))();
  },

  /**
   * Update a Companies info
   * @param {object} request
   * @param {object} response
   * @returns {object} updated company
   */
  update_company: function update_company(request, response) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var findOneQuery, updateOneQuery, _yield$db$query5, rows, values, updated;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              findOneQuery = "SELECT * FROM companies WHERE id=$1";
              updateOneQuery = "UPDATE companies\n      SET name=$1,location=$2,employees=$3,networth=$4,modified_date=$5\n      WHERE id=$6 returning *";
              _context4.prev = 2;
              _context4.next = 5;
              return _db["default"].query(findOneQuery, [request.params.id]);

            case 5:
              _yield$db$query5 = _context4.sent;
              rows = _yield$db$query5.rows;

              if (rows[0]) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                error: "Company not found"
              }));

            case 9:
              values = [request.body.name || rows[0].name, request.location || rows[0].location, request.body.employees || rows[0].employees, request.body.networth || rows[0].networth, (0, _moment["default"])(new Date()), request.params.id];
              _context4.next = 12;
              return _db["default"].query(updateOneQuery, values);

            case 12:
              updated = _context4.sent;
              return _context4.abrupt("return", response.status(200).send(updated.rows[0]));

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](2);
              return _context4.abrupt("return", response.status(400).send(_context4.t0));

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 16]]);
    }))();
  },

  /**
   * Deletes a company with specifc id
   * @param {object} request
   * @param {object} response
   * @returns {void} return status code 204 to indicate successful deletion
   */
  delete_company: function delete_company(request, response) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var deleteQuery, _yield$db$query6, rows;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              deleteQuery = "DELETE FROM companies WHERE id=$1 returning *";
              _context5.prev = 1;
              _context5.next = 4;
              return _db["default"].query(deleteQuery, [request.params.id]);

            case 4:
              _yield$db$query6 = _context5.sent;
              rows = _yield$db$query6.rows;

              if (rows[0]) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", response.status(404).send({
                error: "company not found"
              }));

            case 8:
              return _context5.abrupt("return", response.status(204).send({
                success: "company deleted successfully"
              }));

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", response.status(400).send(_context5.t0));

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 11]]);
    }))();
  }
};
var _default = companiesController;
exports["default"] = _default;