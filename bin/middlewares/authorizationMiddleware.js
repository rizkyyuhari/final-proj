"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _UnauthorizedError = _interopRequireDefault(require("../errors/UnauthorizedError"));
var authenticationMiddleware = function authenticationMiddleware(request, response, next) {
  var authorizationHeader = request.get('Authorization');
  var JWT_SECRET = process.env.JWT_SECRET;
  try {
    var token = authorizationHeader.replace('Bearer ', '');
    var decodedJwt = _jsonwebtoken["default"].verify(token, JWT_SECRET);
    request.decodedJwt = decodedJwt;
    return next();
  } catch (error) {
    return next(new _UnauthorizedError["default"]());
  }
};
var _default = exports["default"] = authenticationMiddleware;