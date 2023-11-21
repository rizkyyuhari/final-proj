"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tickerRoute = _interopRequireDefault(require("./tickerRoute"));
var _priceHistoryRoute = _interopRequireDefault(require("./priceHistoryRoute"));
var _customerRoute = _interopRequireDefault(require("./customerRoute"));
var _authenticationRoute = _interopRequireDefault(require("./authenticationRoute"));
var _authorizationMiddleware = _interopRequireDefault(require("../middlewares/authorizationMiddleware"));
var router = (0, _express.Router)();
var indexRoutes = function indexRoutes(app) {
  app.use('/', router);
  router.use('/tickers', _authorizationMiddleware["default"], (0, _tickerRoute["default"])(app));
  router.use('/price-histories', _authorizationMiddleware["default"], (0, _priceHistoryRoute["default"])(app));
  router.use('/customers', _authorizationMiddleware["default"], (0, _customerRoute["default"])(app));
  router.use('/tokens', (0, _authenticationRoute["default"])(app));
};
var _default = exports["default"] = indexRoutes;