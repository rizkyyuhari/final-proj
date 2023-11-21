"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _yamljs = _interopRequireDefault(require("yamljs"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _routes = _interopRequireDefault(require("./routes"));
var _TickerController = _interopRequireDefault(require("./controllers/TickerController"));
var _Ticker = _interopRequireDefault(require("./models/Ticker"));
var _PriceHistory = _interopRequireDefault(require("./models/PriceHistory"));
var _Transaction = _interopRequireDefault(require("./models/Transaction"));
var _TickerService = _interopRequireDefault(require("./services/TickerService"));
var _PriceHistoryController = _interopRequireDefault(require("./controllers/PriceHistoryController"));
var _PriceHistoryService = _interopRequireDefault(require("./services/PriceHistoryService"));
var _errorMiddleware = _interopRequireDefault(require("./middlewares/errorMiddleware"));
var _TransactionController = _interopRequireDefault(require("./controllers/TransactionController"));
var _TransactionService = _interopRequireDefault(require("./services/TransactionService"));
var _PortfolioController = _interopRequireDefault(require("./controllers/PortfolioController"));
var _Portfolio = _interopRequireDefault(require("./models/Portfolio"));
var _PortfolioService = _interopRequireDefault(require("./services/PortfolioService"));
var _AuthenticationController = _interopRequireDefault(require("./controllers/AuthenticationController"));
var _AuthenticationService = _interopRequireDefault(require("./services/AuthenticationService"));
var _CustomerController = _interopRequireDefault(require("./controllers/CustomerController"));
var _CustomerService = _interopRequireDefault(require("./services/CustomerService"));
var _Customer = _interopRequireDefault(require("./models/Customer"));
/* eslint-disable max-lines-per-function */

_dotenv["default"].config();
var app = (0, _express["default"])();
var swaggerDocument = _yamljs["default"].load('./src/swagger/swagger.yaml');
var corsOptions = {
  origin: [process.env.WEB_URL, process.env.ANDROID_URL, process.env.IOS_URL]
};
app.use((0, _cors["default"])(corsOptions));
app.use(_express["default"].json());
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerDocument));

// eslint-disable-next-line max-lines-per-function
var createControllers = function createControllers(services) {
  var tickerService = services.tickerService,
    priceHistoryService = services.priceHistoryService,
    transactionService = services.transactionService,
    portfolioService = services.portfolioService,
    authenticationService = services.authenticationService,
    customerService = services.customerService;
  return {
    tickerController: new _TickerController["default"](tickerService),
    priceHistoryController: new _PriceHistoryController["default"](priceHistoryService),
    transactionController: new _TransactionController["default"](transactionService),
    portfolioController: new _PortfolioController["default"](portfolioService),
    authenticationController: new _AuthenticationController["default"](authenticationService),
    customerController: new _CustomerController["default"](customerService)
  };
};

// eslint-disable-next-line max-lines-per-function
var createServices = function createServices() {
  var tickerService = new _TickerService["default"](_Ticker["default"]);
  var priceHistoryService = new _PriceHistoryService["default"](_PriceHistory["default"]);
  var customerService = new _CustomerService["default"](_Customer["default"]);
  var authenticationService = new _AuthenticationService["default"](_Customer["default"]);
  var portfolioService = new _PortfolioService["default"](_Portfolio["default"], tickerService, customerService);
  var transactionService = new _TransactionService["default"](_Transaction["default"], portfolioService, tickerService, customerService);
  return {
    authenticationService: authenticationService,
    tickerService: tickerService,
    priceHistoryService: priceHistoryService,
    transactionService: transactionService,
    portfolioService: portfolioService,
    customerService: customerService
  };
};
var registerDependencies = function registerDependencies() {
  app.locals.controllers = createControllers(createServices());
};
var main = function main() {
  registerDependencies();
  (0, _routes["default"])(app);
};
main();
app.use(_errorMiddleware["default"]);
var _default = exports["default"] = app;