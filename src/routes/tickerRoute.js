/* eslint-disable max-lines-per-function */
import { Router } from 'express';
import asyncHandlerMiddleware from '../middlewares/asyncErrorHandler';

const router = Router();

const initializeRoutes = (app) => {
  const { tickerController } = app.locals.controllers;
  router.get('/', asyncHandlerMiddleware(tickerController.findAll));
  router.get('/:id', asyncHandlerMiddleware(tickerController.findOne));
  return router;
};

export default initializeRoutes;
