/* eslint-disable max-lines-per-function */
import { Router } from 'express';
import asyncHandlerMiddleware from '../middlewares/asyncErrorHandler';

const router = Router();

const initializeRoutes = (app) => {
  const { priceHistoryController } = app.locals.controllers;
  router.get('/', asyncHandlerMiddleware(priceHistoryController.findAll));
  return router;
};

export default initializeRoutes;
