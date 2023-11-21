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
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var _priceHistoryService = /*#__PURE__*/new WeakMap();
var _findAll = /*#__PURE__*/new WeakSet();
var PriceHistoryController = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function PriceHistoryController(priceHistoryService) {
  (0, _classCallCheck2["default"])(this, PriceHistoryController);
  _classPrivateMethodInitSpec(this, _findAll);
  _classPrivateFieldInitSpec(this, _priceHistoryService, {
    writable: true,
    value: void 0
  });
  (0, _classPrivateFieldSet2["default"])(this, _priceHistoryService, priceHistoryService);
  this.findAll = _classPrivateMethodGet(this, _findAll, _findAll2).bind(this);
});
function _findAll2(_x, _x2) {
  return _findAll3.apply(this, arguments);
}
function _findAll3() {
  _findAll3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response) {
    var query, dateFrom, dateTo, search, payload, priceHistories;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          query = request.query;
          dateFrom = query.date_from, dateTo = query.date_to, search = query.search;
          payload = {
            dateFrom: dateFrom,
            dateTo: dateTo,
            search: search
          };
          _context.next = 5;
          return (0, _classPrivateFieldGet2["default"])(this, _priceHistoryService).findAll(payload);
        case 5:
          priceHistories = _context.sent;
          response.status(200).json({
            priceHistories: priceHistories
          });
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _findAll3.apply(this, arguments);
}