"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _options = require("./options");
var tickerSchema = new _mongoose.Schema({
  name: {
    type: _mongoose.Schema.Types.String
  },
  ticker: {
    type: _mongoose.Schema.Types.String
  },
  description: {
    type: _mongoose.Schema.Types.String
  }
}, {
  timestamps: true
});
tickerSchema.set('toJSON', _options.toJSONOptions);
var _default = exports["default"] = (0, _mongoose.model)('Ticker', tickerSchema, 'ticker');