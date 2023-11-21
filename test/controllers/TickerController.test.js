import { when } from 'jest-when';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../src/app';
import Ticker from '../../src/models/Ticker';
import registeredCustomer from '../fixtures/registeredCustomer';
import tickersResponse from '../fixtures/ticker';

const { JWT_SECRET } = process.env;
const token = 'validtoken';

jest.mock('jsonwebtoken');

jest.mock('../../src/models/Ticker', () => ({
  find: jest.fn(),
  findOne: jest.fn()
}));

describe('TickerController', () => {
  describe('GET /tickers', () => {
    it('should return array of object tickers when called /tickers succesfully', async () => {
      const expectedResult = tickersResponse;
      when(jwt.verify).calledWith(token, JWT_SECRET).mockReturnValue(registeredCustomer);
      Ticker.find.mockResolvedValue(expectedResult.tickers);
      const { body } = await request(app)
        .get(`/tickers`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual(expectedResult);
    });
  });

  describe('GET /tickers/:id', () => {
    it('should return ticker btc when input ticker id 5', async () => {
      when(jwt.verify).calledWith(token, JWT_SECRET).mockReturnValue(registeredCustomer);
      const expectedResult = tickersResponse;
      Ticker.findOne.mockResolvedValue(expectedResult);
      const { body } = await request(app)
        .get(`/tickers/6545f62508c52cc0569dc101`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual(expectedResult);
    });
  });
});
