"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
var _httpStatusCodes = require("http-status-codes");
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var _portfolioService = /*#__PURE__*/new WeakMap();
var _findAllByCustomerId = /*#__PURE__*/new WeakSet();
var PortfolioController = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function PortfolioController(portfolioService) {
  (0, _classCallCheck2["default"])(this, PortfolioController);
  _classPrivateMethodInitSpec(this, _findAllByCustomerId);
  _classPrivateFieldInitSpec(this, _portfolioService, {
    writable: true,
    value: void 0
  });
  (0, _classPrivateFieldSet2["default"])(this, _portfolioService, portfolioService);
  this.findAllByCustomerId = _classPrivateMethodGet(this, _findAllByCustomerId, _findAllByCustomerId2).bind(this);
});
function _findAllByCustomerId2(_x, _x2) {
  return _findAllByCustomerId3.apply(this, arguments);
}
function _findAllByCustomerId3() {
  _findAllByCustomerId3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response) {
    var customerId, _request$query, dateFrom, dateTo, payload, portfolios;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          customerId = request.params.customerId;
          _request$query = request.query, dateFrom = _request$query.date_from, dateTo = _request$query.date_to;
          payload = {
            dateFrom: dateFrom,
            dateTo: dateTo,
            customerId: customerId
          };
          _context.next = 5;
          return (0, _classPrivateFieldGet2["default"])(this, _portfolioService).findAllByCustomerId(payload);
        case 5:
          portfolios = _context.sent;
          response.status(_httpStatusCodes.StatusCodes.OK).send({
            portfolios: portfolios
          });
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _findAllByCustomerId3.apply(this, arguments);
}