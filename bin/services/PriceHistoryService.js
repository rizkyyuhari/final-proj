"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
var _extractDate = _interopRequireDefault(require("../utils/extractDate"));
var _transformDateInArray = _interopRequireDefault(require("../utils/transformDateInArray"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } } /* eslint-disable max-lines-per-function */
var _priceHistoryModel = /*#__PURE__*/new WeakMap();
var PriceHistoryService = exports["default"] = /*#__PURE__*/function () {
  function PriceHistoryService(priceHistoryModel) {
    (0, _classCallCheck2["default"])(this, PriceHistoryService);
    _classPrivateFieldInitSpec(this, _priceHistoryModel, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _priceHistoryModel, priceHistoryModel);
  }
  (0, _createClass2["default"])(PriceHistoryService, [{
    key: "findAll",
    value: function () {
      var _findAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(query) {
        var options, priceHistories, searchText;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              options = {};
              if (query.dateFrom || query.dateTo) {
                options = _objectSpread(_objectSpread({}, options), {}, {
                  createdAt: (0, _extractDate["default"])(query)
                });
              }
              _context.next = 4;
              return (0, _classPrivateFieldGet2["default"])(this, _priceHistoryModel).find(options).populate({
                path: 'ticker',
                select: {
                  name: 1,
                  ticker: 1
                }
              }).transform(_transformDateInArray["default"]);
            case 4:
              priceHistories = _context.sent;
              if (!query.search) {
                _context.next = 8;
                break;
              }
              searchText = query.search.toLowerCase();
              return _context.abrupt("return", priceHistories.filter(function (priceHistory) {
                return priceHistory.ticker.name.toLowerCase().includes(searchText) || priceHistory.ticker.ticker.toLowerCase().includes(searchText);
              }));
            case 8:
              return _context.abrupt("return", priceHistories);
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function findAll(_x) {
        return _findAll.apply(this, arguments);
      }
      return findAll;
    }()
  }]);
  return PriceHistoryService;
}();