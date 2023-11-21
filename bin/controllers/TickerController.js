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
var _tickerService = /*#__PURE__*/new WeakMap();
var _findAll = /*#__PURE__*/new WeakSet();
var _findOne = /*#__PURE__*/new WeakSet();
var TickerController = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function TickerController(tickerService) {
  (0, _classCallCheck2["default"])(this, TickerController);
  _classPrivateMethodInitSpec(this, _findOne);
  _classPrivateMethodInitSpec(this, _findAll);
  _classPrivateFieldInitSpec(this, _tickerService, {
    writable: true,
    value: void 0
  });
  (0, _classPrivateFieldSet2["default"])(this, _tickerService, tickerService);
  this.findAll = _classPrivateMethodGet(this, _findAll, _findAll2).bind(this);
  this.findOne = _classPrivateMethodGet(this, _findOne, _findOne2).bind(this);
});
function _findAll2(_x, _x2) {
  return _findAll3.apply(this, arguments);
}
function _findAll3() {
  _findAll3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, response) {
    var tickers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _classPrivateFieldGet2["default"])(this, _tickerService).findAll();
        case 2:
          tickers = _context.sent;
          response.status(200).json({
            tickers: tickers
          });
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _findAll3.apply(this, arguments);
}
function _findOne2(_x3, _x4) {
  return _findOne3.apply(this, arguments);
}
function _findOne3() {
  _findOne3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response) {
    var id, customer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = request.params.id;
          _context2.next = 3;
          return (0, _classPrivateFieldGet2["default"])(this, _tickerService).findById(id);
        case 3:
          customer = _context2.sent;
          response.status(200).json(customer);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return _findOne3.apply(this, arguments);
}