"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _ParameterValidationError = _interopRequireDefault(require("../errors/ParameterValidationError"));
var validateParamIdMiddleware = function validateParamIdMiddleware() {
  return function (request, response, next) {
    var customerId = request.params.customerId;
    var isIdValid = _mongoose["default"].isValidObjectId(customerId);
    if (!isIdValid) {
      return response.status(400).json({
        message: new _ParameterValidationError["default"]().message
      });
    }
    return next();
  };
};
var _default = exports["default"] = validateParamIdMiddleware;