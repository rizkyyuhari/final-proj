"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _options = require("./options");
var customerSchema = (0, _mongoose.Schema)({
  name: {
    type: _mongoose.Schema.Types.String
  },
  username: {
    type: _mongoose.Schema.Types.String
  },
  password: {
    type: _mongoose.Schema.Types.String
  }
}, {
  timestamps: true
});
customerSchema.set('toJSON', _options.toJSONOptions);
var _default = exports["default"] = (0, _mongoose.model)('Customer', customerSchema, 'customer');