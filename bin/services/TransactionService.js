"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
var _jsBigDecimal = _interopRequireDefault(require("js-big-decimal"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _InsufficientBalanceError = _interopRequireDefault(require("../errors/InsufficientBalanceError"));
var _NotEnoughCoinError = _interopRequireDefault(require("../errors/NotEnoughCoinError"));
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; } /* eslint-disable max-lines-per-function */
var today = new Date();
today.setHours(0, 0, 0, 0);
var _transactionModel = /*#__PURE__*/new WeakMap();
var _portfolioService = /*#__PURE__*/new WeakMap();
var _tickerService = /*#__PURE__*/new WeakMap();
var _customerService = /*#__PURE__*/new WeakMap();
var _buy = /*#__PURE__*/new WeakSet();
var _sell = /*#__PURE__*/new WeakSet();
var _updateBalance = /*#__PURE__*/new WeakSet();
var _updatePortfolio = /*#__PURE__*/new WeakSet();
var _createNewTransaction = /*#__PURE__*/new WeakSet();
var TransactionService = exports["default"] = /*#__PURE__*/function () {
  function TransactionService(transactionModel, portfolioService, tickerService, customerService) {
    (0, _classCallCheck2["default"])(this, TransactionService);
    _classPrivateMethodInitSpec(this, _createNewTransaction);
    _classPrivateMethodInitSpec(this, _updatePortfolio);
    _classPrivateMethodInitSpec(this, _updateBalance);
    _classPrivateMethodInitSpec(this, _sell);
    _classPrivateMethodInitSpec(this, _buy);
    _classPrivateFieldInitSpec(this, _transactionModel, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _portfolioService, {
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
    (0, _classPrivateFieldSet2["default"])(this, _transactionModel, transactionModel);
    (0, _classPrivateFieldSet2["default"])(this, _portfolioService, portfolioService);
    (0, _classPrivateFieldSet2["default"])(this, _tickerService, tickerService);
    (0, _classPrivateFieldSet2["default"])(this, _customerService, customerService);
  }
  (0, _createClass2["default"])(TransactionService, [{
    key: "findAll",
    value: function () {
      var _findAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(query) {
        var _query$ticker;
        var _query$limit, limit, _query$page, page;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _query$limit = query.limit, limit = _query$limit === void 0 ? 10 : _query$limit, _query$page = query.page, page = _query$page === void 0 ? 1 : _query$page;
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _transactionModel).aggregate([{
                $lookup: {
                  from: 'ticker',
                  localField: 'ticker',
                  foreignField: '_id',
                  as: 'ticker'
                }
              }, {
                $unwind: '$ticker'
              }, {
                $match: {
                  'ticker.ticker': {
                    $regex: (_query$ticker = query.ticker) !== null && _query$ticker !== void 0 ? _query$ticker : '',
                    $options: 'i'
                  },
                  customer: new _mongoose["default"].Types.ObjectId(query.customerId)
                }
              }, {
                $project: {
                  amount: 1,
                  category: 1,
                  date: '$createdAt',
                  id: '$_id',
                  'ticker.ticker': 1,
                  'ticker.id': '$ticker._id',
                  totalPrice: 1,
                  _id: 0
                }
              }, {
                $sort: {
                  date: query.sort ? 1 : -1
                }
              }, {
                $skip: (Number(page) - 1) * Number(limit)
              }, {
                $limit: Number(limit)
              }]));
            case 2:
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
  }, {
    key: "create",
    value: function create(newTransaction) {
      if (newTransaction.category === 'buy') {
        return _classPrivateMethodGet(this, _buy, _buy2).call(this, newTransaction);
      }
      return _classPrivateMethodGet(this, _sell, _sell2).call(this, newTransaction);
    }
  }]);
  return TransactionService;
}();
function _buy2(_x2) {
  return _buy3.apply(this, arguments);
}
function _buy3() {
  _buy3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(newTransaction) {
    var rupiahTicker;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _classPrivateFieldGet2["default"])(this, _portfolioService).findOneByTickerIdAndDate({
            ticker: '654b1142b811bfd8313a274b',
            date: today
          });
        case 2:
          rupiahTicker = _context2.sent;
          if (!(rupiahTicker.amount < newTransaction.totalPrice)) {
            _context2.next = 5;
            break;
          }
          throw new _InsufficientBalanceError["default"]();
        case 5:
          _context2.next = 7;
          return _classPrivateMethodGet(this, _updateBalance, _updateBalance2).call(this, newTransaction, (rupiahTicker.amount - newTransaction.totalPrice).toFixed(2));
        case 7:
          _context2.next = 9;
          return _classPrivateMethodGet(this, _createNewTransaction, _createNewTransaction2).call(this, newTransaction);
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return _buy3.apply(this, arguments);
}
function _sell2(_x3) {
  return _sell3.apply(this, arguments);
}
function _sell3() {
  _sell3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(newTransaction) {
    var ticker, rupiahTicker;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _classPrivateFieldGet2["default"])(this, _portfolioService).findOneByTickerIdAndDate({
            ticker: newTransaction.tickerId,
            date: today
          });
        case 2:
          ticker = _context3.sent;
          if (!(ticker.amount < newTransaction.amount)) {
            _context3.next = 5;
            break;
          }
          throw new _NotEnoughCoinError["default"]();
        case 5:
          _context3.next = 7;
          return (0, _classPrivateFieldGet2["default"])(this, _portfolioService).updateByTickerAndDate({
            id: newTransaction.tickerId,
            amount: _jsBigDecimal["default"].subtract(ticker.amount, newTransaction.amount),
            date: today
          });
        case 7:
          _context3.next = 9;
          return (0, _classPrivateFieldGet2["default"])(this, _portfolioService).findOneByTickerIdAndDate({
            ticker: '654b1142b811bfd8313a274b',
            date: today
          });
        case 9:
          rupiahTicker = _context3.sent;
          _context3.next = 12;
          return (0, _classPrivateFieldGet2["default"])(this, _portfolioService).updateByTickerAndDate({
            id: '654b1142b811bfd8313a274b',
            amount: rupiahTicker.amount + newTransaction.totalPrice,
            date: today
          });
        case 12:
          _context3.next = 14;
          return _classPrivateMethodGet(this, _createNewTransaction, _createNewTransaction2).call(this, newTransaction);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, this);
  }));
  return _sell3.apply(this, arguments);
}
function _updateBalance2(_x4, _x5) {
  return _updateBalance3.apply(this, arguments);
}
function _updateBalance3() {
  _updateBalance3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(newTransaction, newBalance) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _classPrivateFieldGet2["default"])(this, _portfolioService).updateByTickerAndDate({
            id: '654b1142b811bfd8313a274b',
            amount: newBalance,
            date: today
          });
        case 2:
          _context4.next = 4;
          return _classPrivateMethodGet(this, _updatePortfolio, _updatePortfolio2).call(this, newTransaction);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4, this);
  }));
  return _updateBalance3.apply(this, arguments);
}
function _updatePortfolio2(_x6) {
  return _updatePortfolio3.apply(this, arguments);
}
function _updatePortfolio3() {
  _updatePortfolio3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(newTransaction) {
    var ticker, amount, customer, tickerAlreadyBought;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          ticker = newTransaction.tickerId, amount = newTransaction.amount, customer = newTransaction.customerId;
          _context5.next = 3;
          return (0, _classPrivateFieldGet2["default"])(this, _portfolioService).findOneByTickerIdAndDate({
            ticker: ticker,
            date: today
          });
        case 3:
          tickerAlreadyBought = _context5.sent;
          if (tickerAlreadyBought) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _portfolioService).create({
            ticker: ticker,
            amount: amount,
            customer: customer
          }));
        case 6:
          return _context5.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _portfolioService).updateByTickerAndDate({
            id: ticker,
            amount: _jsBigDecimal["default"].add(amount, tickerAlreadyBought.amount),
            date: today
          }));
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5, this);
  }));
  return _updatePortfolio3.apply(this, arguments);
}
function _createNewTransaction2(_x7) {
  return _createNewTransaction3.apply(this, arguments);
}
function _createNewTransaction3() {
  _createNewTransaction3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(payload) {
    var ticker, customer;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _classPrivateFieldGet2["default"])(this, _tickerService).findById(payload.tickerId);
        case 2:
          ticker = _context6.sent;
          _context6.next = 5;
          return (0, _classPrivateFieldGet2["default"])(this, _customerService).findById(payload.customerId);
        case 5:
          customer = _context6.sent;
          _context6.next = 8;
          return (0, _classPrivateFieldGet2["default"])(this, _transactionModel).create({
            ticker: ticker,
            amount: payload.amount,
            fee: payload.fee,
            category: payload.category,
            totalPrice: payload.totalPrice,
            customer: customer
          });
        case 8:
        case "end":
          return _context6.stop();
      }
    }, _callee6, this);
  }));
  return _createNewTransaction3.apply(this, arguments);
}