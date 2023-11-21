"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _IncorrectCredentialError = _interopRequireDefault(require("../errors/IncorrectCredentialError"));
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
var _customer = /*#__PURE__*/new WeakMap();
var AuthenticationService = exports["default"] = /*#__PURE__*/function () {
  function AuthenticationService(customer) {
    (0, _classCallCheck2["default"])(this, AuthenticationService);
    _classPrivateFieldInitSpec(this, _customer, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _customer, customer);
  }
  (0, _createClass2["default"])(AuthenticationService, [{
    key: "authenticateCustomer",
    value: function () {
      var _authenticateCustomer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userAccount) {
        var username, password, existingUser, isPasswordMatch, _process$env, JWT_SECRET, JWT_EXPIRATION, payload, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              username = userAccount.username, password = userAccount.password;
              _context.next = 3;
              return (0, _classPrivateFieldGet2["default"])(this, _customer).findOne({
                username: username
              });
            case 3:
              existingUser = _context.sent;
              if (existingUser) {
                _context.next = 6;
                break;
              }
              throw new _IncorrectCredentialError["default"]();
            case 6:
              isPasswordMatch = _bcryptjs["default"].compareSync(password, existingUser.password);
              if (isPasswordMatch) {
                _context.next = 9;
                break;
              }
              throw new _IncorrectCredentialError["default"]();
            case 9:
              _process$env = process.env, JWT_SECRET = _process$env.JWT_SECRET, JWT_EXPIRATION = _process$env.JWT_EXPIRATION;
              payload = JSON.parse(JSON.stringify(_classStaticPrivateMethodGet(AuthenticationService, AuthenticationService, _transformCustomerData).call(AuthenticationService, existingUser)));
              token = _jsonwebtoken["default"].sign(payload, JWT_SECRET, {
                expiresIn: JWT_EXPIRATION
              });
              return _context.abrupt("return", {
                token: token
              });
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function authenticateCustomer(_x) {
        return _authenticateCustomer.apply(this, arguments);
      }
      return authenticateCustomer;
    }()
  }]);
  return AuthenticationService;
}();
function _transformCustomerData(customer) {
  return {
    id: customer.id,
    name: customer.name,
    username: customer.username
  };
}