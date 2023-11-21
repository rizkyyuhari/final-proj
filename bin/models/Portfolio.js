"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _options = require("./options");
var portfolioSchema = (0, _mongoose.Schema)({
  ticker: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Ticker'
  },
  amount: {
    type: _mongoose.Schema.Types.Number
  },
  customer: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }
}, {
  timestamps: true
});
portfolioSchema.set('toJSON', _options.toJSONOptions);
var _default = exports["default"] = (0, _mongoose.model)('Portfolio', portfolioSchema, 'portfolio');