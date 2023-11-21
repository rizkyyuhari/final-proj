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
  var priceHistoryController = app.locals.controllers.priceHistoryController;
  router.get('/', (0, _asyncErrorHandler["default"])(priceHistoryController.findAll));
  return router;
};
var _default = exports["default"] = initializeRoutes;