"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _options = require("./options");
var transactionSchema = (0, _mongoose.Schema)({
  ticker: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Ticker'
  },
  amount: {
    type: _mongoose.Schema.Types.Number
  },
  fee: {
    type: _mongoose.Schema.Types.Number
  },
  category: {
    type: _mongoose.Schema.Types.String,
    "enum": ['buy', 'sell']
  },
  totalPrice: {
    type: _mongoose.Schema.Types.Number
  },
  customer: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }
}, {
  timestamps: true
});
transactionSchema.set('toJSON', _options.toJSONOptions);
var _default = exports["default"] = (0, _mongoose.model)('Transaction', transactionSchema, 'transaction');