/* eslint-disable max-lines-per-function */
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRoutes from './routes';
import TickerController from './controllers/TickerController';
import Ticker from './models/Ticker';
import PriceHistory from './models/PriceHistory';
import Transaction from './models/Transaction';
import TickerService from './services/TickerService';
import PriceHistoryController from './controllers/PriceHistoryController';
import PriceHistoryService from './services/PriceHistoryService';
import errorMiddleware from './middlewares/errorMiddleware';
import TransactionController from './controllers/TransactionController';
import TransactionService from './services/TransactionService';
import PortfolioController from './controllers/PortfolioController';
import Portfolio from './models/Portfolio';
import PortfolioService from './services/PortfolioService';
import AuthenticationController from './controllers/AuthenticationController';
import AuthenticationService from './services/AuthenticationService';
import CustomerController from './controllers/CustomerController';
import CustomerService from './services/CustomerService';
import Customer from './models/Customer';

dotenv.config();
const app = express();
const swaggerDocument = YAML.load('./src/swagger/swagger.yaml');

const corsOptions = {
  origin: [process.env.WEB_URL, process.env.ANDROID_URL, process.env.IOS_URL]
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// eslint-disable-next-line max-lines-per-function
const createControllers = (services) => {
  const {
    tickerService,
    priceHistoryService,
    transactionService,
    portfolioService,
    authenticationService,
    customerService
  } = services;
  return {
    tickerController: new TickerController(tickerService),
    priceHistoryController: new PriceHistoryController(priceHistoryService),
    transactionController: new TransactionController(transactionService),
    portfolioController: new PortfolioController(portfolioService),
    authenticationController: new AuthenticationController(authenticationService),
    customerController: new CustomerController(customerService)
  };
};

// eslint-disable-next-line max-lines-per-function
const createServices = () => {
  const tickerService = new TickerService(Ticker);
  const priceHistoryService = new PriceHistoryService(PriceHistory);
  const customerService = new CustomerService(Customer);
  const authenticationService = new AuthenticationService(Customer);
  const portfolioService = new PortfolioService(Portfolio, tickerService, customerService);
  const transactionService = new TransactionService(
    Transaction,
    portfolioService,
    tickerService,
    customerService
  );
  return {
    authenticationService,
    tickerService,
    priceHistoryService,
    transactionService,
    portfolioService,
    customerService
  };
};

const registerDependencies = () => {
  app.locals.controllers = createControllers(createServices());
};

const main = () => {
  registerDependencies();
  indexRoutes(app);
};

main();

app.use(errorMiddleware);

export default app;
