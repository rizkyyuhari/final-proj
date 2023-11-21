"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable no-unused-vars */
var errorMiddleware = function errorMiddleware(error, _request, response, _next) {
  response.status(error.statusCode || 500).json({
    message: error.message
  });
};
var _default = exports["default"] = errorMiddleware;