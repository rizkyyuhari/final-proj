"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
var _httpStatusCodes = require("http-status-codes");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var _transactionService = /*#__PURE__*/new WeakMap();
var _findAll = /*#__PURE__*/new WeakSet();
var _create = /*#__PURE__*/new WeakSet();
var TransactionController = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function TransactionController(transactionService) {
  (0, _classCallCheck2["default"])(this, TransactionController);
  _classPrivateMethodInitSpec(this, _create);
  _classPrivateMethodInitSpec(this, _findAll);
  _classPrivateFieldInitSpec(this, _transactionService, {
    writable: true,
    value: void 0
  });
  (0, _classPrivateFieldSet2["default"])(this, _transactionService, transactionService);
  this.findAll = _classPrivateMethodGet(this, _findAll, _findAll2).bind(this);
  this.create = _classPrivateMethodGet(this, _create, _create2).bind(this);
});
function _findAll2(_x, _x2) {
  return _findAll3.apply(this, arguments);
}
function _findAll3() {
  _findAll3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response) {
    var customerId, query, transactions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          customerId = request.params.customerId;
          query = _objectSpread({
            customerId: customerId
          }, request.query);
          _context.next = 4;
          return (0, _classPrivateFieldGet2["default"])(this, _transactionService).findAll(query);
        case 4:
          transactions = _context.sent;
          response.status(_httpStatusCodes.StatusCodes.OK).json({
            transactions: transactions
          });
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _findAll3.apply(this, arguments);
}
function _create2(_x3, _x4) {
  return _create3.apply(this, arguments);
}
function _create3() {
  _create3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response) {
    var customerId, newTransaction;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          customerId = request.params.customerId;
          newTransaction = _objectSpread({
            customerId: customerId
          }, request.body);
          _context2.next = 4;
          return (0, _classPrivateFieldGet2["default"])(this, _transactionService).create(newTransaction);
        case 4:
          response.status(201).json();
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return _create3.apply(this, arguments);
}