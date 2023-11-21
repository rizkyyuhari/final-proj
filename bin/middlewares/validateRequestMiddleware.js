"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var validateRequestMiddleware = function validateRequestMiddleware(schema) {
  return function (request, response, next) {
    var _schema$validate = schema.validate(request.body),
      error = _schema$validate.error;
    if (error) {
      var message = error.details[0].message;
      return response.status(400).json({
        message: message
      });
    }
    return next();
  };
};
var _default = exports["default"] = validateRequestMiddleware;