"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _options = require("./options");
var priceHistorySchema = (0, _mongoose.Schema)({
  price: {
    type: _mongoose.Schema.Types.Number
  },
  ticker: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Ticker'
  }
}, {
  timestamps: true
});
priceHistorySchema.set('toJSON', _options.toJSONOptions);
var _default = exports["default"] = (0, _mongoose.model)('PriceHistory', priceHistorySchema, 'price-history');