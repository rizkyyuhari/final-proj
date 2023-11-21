"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _asyncErrorHandler = _interopRequireDefault(require("../middlewares/asyncErrorHandler"));
/* eslint-disable max-lines-per-function */

var router = (0, _express.Router)();
var initializeRoutes = function initializeRoutes(app) {
  var authenticationController = app.locals.controllers.authenticationController;
  router.post('/', (0, _asyncErrorHandler["default"])(authenticationController.login));
  return router;
};
var _default = exports["default"] = initializeRoutes;