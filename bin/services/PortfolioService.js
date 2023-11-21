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
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
var _portfolio = /*#__PURE__*/new WeakMap();
var _tickerService = /*#__PURE__*/new WeakMap();
var _customerService = /*#__PURE__*/new WeakMap();
var PortfolioService = exports["default"] = /*#__PURE__*/function () {
  function PortfolioService(portfolio, tickerService, customerService) {
    (0, _classCallCheck2["default"])(this, PortfolioService);
    _classPrivateFieldInitSpec(this, _portfolio, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _tickerService, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _customerService, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _portfolio, portfolio);
    (0, _classPrivateFieldSet2["default"])(this, _tickerService, tickerService);
    (0, _classPrivateFieldSet2["default"])(this, _customerService, customerService);
  }
  (0, _createClass2["default"])(PortfolioService, [{
    key: "findAllByCustomerId",
    value: function () {
      var _findAllByCustomerId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
        var customerId, dateFrom, dateTo, options, responseData;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              customerId = payload.customerId, dateFrom = payload.dateFrom, dateTo = payload.dateTo;
              options = {
                customer: customerId,
                createdAt: _classStaticPrivateMethodGet(PortfolioService, PortfolioService, _filterByDateNow).call(PortfolioService)
              };
              if (dateFrom || dateTo) {
                options = {
                  createdAt: (0, _extractDate["default"])({
                    dateFrom: dateFrom,
                    dateTo: dateTo
                  })
                };
              }
              _context.next = 5;
              return (0, _classPrivateFieldGet2["default"])(this, _portfolio).find(options).sort({
                createdAt: 'asc'
              }).populate('ticker').transform(_transformDateInArray["default"]);
            case 5:
              responseData = _context.sent;
              return _context.abrupt("return", Object.values(_classStaticPrivateMethodGet(PortfolioService, PortfolioService, _groupedByDate).call(PortfolioService, responseData)));
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function findAllByCustomerId(_x) {
        return _findAllByCustomerId.apply(this, arguments);
      }
      return findAllByCustomerId;
    }()
  }, {
    key: "findOneByTickerIdAndDate",
    value: function findOneByTickerIdAndDate(_ref) {
      var ticker = _ref.ticker,
        date = _ref.date;
      return (0, _classPrivateFieldGet2["default"])(this, _portfolio).findOne({
        ticker: ticker,
        createdAt: date
      });
    }
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(portfolio) {
        var ticker, customer, today;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _classPrivateFieldGet2["default"])(this, _tickerService).findById(portfolio.ticker);
            case 2:
              ticker = _context2.sent;
              _context2.next = 5;
              return (0, _classPrivateFieldGet2["default"])(this, _customerService).findById(portfolio.customer);
            case 5:
              customer = _context2.sent;
              today = new Date();
              today.setHours(0, 0, 0, 0);
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _portfolio).create({
                amount: portfolio.amount,
                ticker: ticker,
                customer: customer,
                createdAt: today,
                updatedAt: today
              }));
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function create(_x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "updateByTickerAndDate",
    value: function updateByTickerAndDate(portfolio) {
      var RUPIAH_TICKER_ID = '654b1142b811bfd8313a274b';
      if (Number(portfolio.amount) === 0 && portfolio.id !== RUPIAH_TICKER_ID) {
        return (0, _classPrivateFieldGet2["default"])(this, _portfolio).deleteOne({
          ticker: portfolio.id,
          createdAt: portfolio.date
        });
      }
      return (0, _classPrivateFieldGet2["default"])(this, _portfolio).findOneAndUpdate({
        ticker: portfolio.id,
        createdAt: portfolio.date
      }, {
        amount: portfolio.amount
      }, {
        "new": true
      });
    }
  }]);
  return PortfolioService;
}();
function _filterByDateNow() {
  var dateFrom = new Date();
  dateFrom.setHours(0, 0, 0, 0);
  var dateTo = new Date();
  dateTo.setHours(0, 0, 0, 0);
  return {
    $gte: dateFrom,
    $lte: dateTo
  };
}
function _groupedByDate(portfolios) {
  return portfolios.reduce(function (previousPortfolio, currentPortfolio) {
    var date = currentPortfolio.date;
    var newPreviousPortfolio = _objectSpread({}, previousPortfolio);
    if (!newPreviousPortfolio[date]) {
      newPreviousPortfolio[date] = {
        date: date,
        tickers: []
      };
    }
    newPreviousPortfolio[date].tickers.push({
      ticker: currentPortfolio.ticker.ticker,
      amount: currentPortfolio.amount,
      id: currentPortfolio.ticker.id
    });
    return newPreviousPortfolio;
  }, {});
}