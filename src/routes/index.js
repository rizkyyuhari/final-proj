import { Router } from 'express';
import tickerRoutes from './tickerRoute';
import priceHistoryRoutes from './priceHistoryRoute';
import customerRoutes from './customerRoute';
import authenticationRoutes from './authenticationRoute';
import authorizationMiddleware from '../middlewares/authorizationMiddleware';

const router = Router();

const indexRoutes = (app) => {
  app.use('/', router);
  router.use('/tickers', authorizationMiddleware, tickerRoutes(app));
  router.use('/price-histories', authorizationMiddleware, priceHistoryRoutes(app));
  router.use('/customers', authorizationMiddleware, customerRoutes(app));
  router.use('/tokens', authenticationRoutes(app));
};

export default indexRoutes;
