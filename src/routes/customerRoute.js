/* eslint-disable max-lines-per-function */
import { Router } from 'express';
import asyncHandlerMiddleware from '../middlewares/asyncErrorHandler';
import validateParamIdMiddleware from '../middlewares/validateParamIdMiddleware';
import validateRequestMiddleware from '../middlewares/validateRequestMiddleware';
import createTransaction from '../validations/createTransaction';

const router = Router();

const initializeRoutes = (app) => {
  const { portfolioController, transactionController, customerController } = app.locals.controllers;
  router.get(
    '/:customerId/portfolio-histories',
    asyncHandlerMiddleware(portfolioController.findAllByCustomerId)
  );
  router.get(
    '/:customerId/transactions',
    validateParamIdMiddleware(),
    asyncHandlerMiddleware(transactionController.findAll)
  );
  router.post(
    '/:customerId/transactions',
    validateParamIdMiddleware(),
    validateRequestMiddleware(createTransaction),
    asyncHandlerMiddleware(transactionController.create)
  );
  router.get(
    '/:customerId',
    validateParamIdMiddleware(),
    asyncHandlerMiddleware(customerController.findOne)
  );

  return router;
};

export default initializeRoutes;
