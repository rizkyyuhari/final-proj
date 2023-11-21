import { when } from 'jest-when';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import DateValidationError from '../../src/errors/DateValidationError';
import PriceHistory from '../../src/models/PriceHistory';
import priceHistoryResponse from '../fixtures/priceHistory';
import registeredCustomer from '../fixtures/registeredCustomer';

const { JWT_SECRET } = process.env;
const token = 'validtoken';

jest.mock('jsonwebtoken');
jest.mock('../../src/models/PriceHistory', () => ({
  find: jest.fn(),
  populate: jest.fn(),
  transform: jest.fn()
}));

describe('PriceHistoryController', () => {
  describe('GET /price-histories', () => {
    it('should return array of object price histories when called /price-histories succesfully', async () => {
      when(jwt.verify).calledWith(token, JWT_SECRET).mockReturnValue(registeredCustomer);
      const expectedResult = priceHistoryResponse;
      PriceHistory.find.mockReturnThis();
      PriceHistory.populate.mockReturnThis();
      PriceHistory.transform.mockResolvedValue(expectedResult.priceHistories);

      const { body } = await request(app)
        .get(`/price-histories`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual(expectedResult);
    });

    it('should return array of object price histories when called /price-histories succesfully', async () => {
      const expectedResult = { message: new DateValidationError().message };
      when(jwt.verify).calledWith(token, JWT_SECRET).mockReturnValue(registeredCustomer);

      const { body } = await request(app)
        .get(`/price-histories?date_from=2023-11-8&date_to=2023-11-5`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(body).toEqual(expectedResult);
    });

    it('should return error message with statusCode 500 when there is unhandled error', async () => {
      const expectedResult = {
        message: 'Cast to undefined failed for value "undefined" at path "undefined"'
      };
      PriceHistory.find.mockImplementation(() => {
        throw new mongoose.CastError();
      });
      when(jwt.verify).calledWith(token, JWT_SECRET).mockReturnValue(registeredCustomer);

      const { body } = await request(app)
        .get(`/price-histories?date_from=2023-11-8&date_to=2023-11-10`)
        .set('Authorization', `Bearer ${token}`)
        .expect(500);

      expect(body).toEqual(expectedResult);
    });
  });
});
