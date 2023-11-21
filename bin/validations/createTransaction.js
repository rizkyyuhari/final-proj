"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
var createTransaction = _joi["default"].object({
  tickerId: _joi["default"].string().required(),
  amount: _joi["default"].number().required(),
  fee: _joi["default"].number().required(),
  category: _joi["default"].string().valid('buy', 'sell').required(),
  totalPrice: _joi["default"].number().required()
});
var _default = exports["default"] = createTransaction;