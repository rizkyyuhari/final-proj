"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DateValidationError = _interopRequireDefault(require("../errors/DateValidationError"));
var extractDate = function extractDate(query) {
  var dateFrom = new Date();
  var dateTo = new Date();
  if (query.dateFrom) {
    dateFrom = new Date(query.dateFrom);
  }
  if (query.dateTo) {
    dateTo = new Date(query.dateTo);
  }
  if (dateFrom > dateTo) {
    throw new _DateValidationError["default"]();
  }
  return {
    $gte: dateFrom,
    $lte: dateTo
  };
};
var _default = exports["default"] = extractDate;