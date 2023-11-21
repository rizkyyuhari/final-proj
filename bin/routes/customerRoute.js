"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _asyncErrorHandler = _interopRequireDefault(require("../middlewares/asyncErrorHandler"));
var _validateParamIdMiddleware = _interopRequireDefault(require("../middlewares/validateParamIdMiddleware"));
var _validateRequestMiddleware = _interopRequireDefault(require("../middlewares/validateRequestMiddleware"));
var _createTransaction = _interopRequireDefault(require("../validations/createTransaction"));
/* eslint-disable max-lines-per-function */

var router = (0, _express.Router)();
var initializeRoutes = function initializeRoutes(app) {
  var _app$locals$controlle = app.locals.controllers,
    portfolioController = _app$locals$controlle.portfolioController,
    transactionController = _app$locals$controlle.transactionController,
    customerController = _app$locals$controlle.customerController;
  router.get('/:customerId/portfolio-histories', (0, _asyncErrorHandler["default"])(portfolioController.findAllByCustomerId));
  router.get('/:customerId/transactions', (0, _validateParamIdMiddleware["default"])(), (0, _asyncErrorHandler["default"])(transactionController.findAll));
  router.post('/:customerId/transactions', (0, _validateParamIdMiddleware["default"])(), (0, _validateRequestMiddleware["default"])(_createTransaction["default"]), (0, _asyncErrorHandler["default"])(transactionController.create));
  router.get('/:customerId', (0, _validateParamIdMiddleware["default"])(), (0, _asyncErrorHandler["default"])(customerController.findOne));
  return router;
};
var _default = exports["default"] = initializeRoutes;