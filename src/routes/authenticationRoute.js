/* eslint-disable max-lines-per-function */
import { Router } from 'express';
import asyncHandlerMiddleware from '../middlewares/asyncErrorHandler';

const router = Router();

const initializeRoutes = (app) => {
  const { authenticationController } = app.locals.controllers;
  router.post('/', asyncHandlerMiddleware(authenticationController.login));
  return router;
};

export default initializeRoutes;
