"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _tickerModel = /*#__PURE__*/new WeakMap();
var TickerService = exports["default"] = /*#__PURE__*/function () {
  function TickerService(tickerModel) {
    (0, _classCallCheck2["default"])(this, TickerService);
    _classPrivateFieldInitSpec(this, _tickerModel, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _tickerModel, tickerModel);
  }
  (0, _createClass2["default"])(TickerService, [{
    key: "findAll",
    value: function findAll() {
      return (0, _classPrivateFieldGet2["default"])(this, _tickerModel).find({}, {
        name: 1,
        ticker: 1,
        id: 1,
        description: 1
      });
    }
  }, {
    key: "findById",
    value: function findById(tickerId) {
      return (0, _classPrivateFieldGet2["default"])(this, _tickerModel).findOne({
        _id: tickerId
      }, {
        name: 1,
        ticker: 1,
        id: 1,
        description: 1
      });
    }
  }]);
  return TickerService;
}();