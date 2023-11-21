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
var _authentication = /*#__PURE__*/new WeakMap();
var _login = /*#__PURE__*/new WeakSet();
var AuthenticationController = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function AuthenticationController(authentication) {
  (0, _classCallCheck2["default"])(this, AuthenticationController);
  _classPrivateMethodInitSpec(this, _login);
  _classPrivateFieldInitSpec(this, _authentication, {
    writable: true,
    value: void 0
  });
  (0, _classPrivateFieldSet2["default"])(this, _authentication, authentication);
  this.login = _classPrivateMethodGet(this, _login, _login2).bind(this);
});
function _login2(_x, _x2) {
  return _login3.apply(this, arguments);
}
function _login3() {
  _login3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response) {
    var customer, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          customer = request.body;
          _context.next = 3;
          return (0, _classPrivateFieldGet2["default"])(this, _authentication).authenticateCustomer(customer);
        case 3:
          token = _context.sent;
          response.status(_httpStatusCodes.StatusCodes.OK).send(token);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _login3.apply(this, arguments);
}