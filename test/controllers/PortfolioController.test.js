import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { when } from 'jest-when';
import app from '../../src/app';
import Portfolio from '../../src/models/Portfolio';
import { portfolios, transformedData } from '../fixtures/portfolio';
import UnauthorizedError from '../../src/errors/UnauthorizedError';

jest.mock('../../src/models/Portfolio', () => ({
  find: jest.fn(),
  populate: jest.fn(),
  transform: jest.fn(),
  sort: jest.fn()
}));

jest.mock('jsonwebtoken');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Portfolio Controller', () => {
  const { JWT_SECRET } = process.env;
  describe('GET /customers/{customerId}/portfolio-histories', () => {
    it('should return list of customer porfolio histories and response code 200 when request to /customers/{customerId}/portfolio-histories succesfully', async () => {
      const foundUser = { username: 'rizky', password: '123456' };
      const expectedResult = portfolios;
      Portfolio.find.mockReturnThis();
      Portfolio.populate.mockReturnThis();
      Portfolio.sort.mockReturnThis();
      Portfolio.transform.mockReturnValue(expectedResult);
      const token = 'validtoken';

      when(jwt.verify).calledWith(token, JWT_SECRET).mockReturnValue(foundUser);

      const { body } = await request(app)
        .get('/customers/65460cc7e174e81823ac62f4/portfolio-histories')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual(transformedData);
    });

    it('should return Invalid token message and status 401 Unauthorized when given token is not successfully verified', async () => {
      const token = 'invalidtoken';
      when(jwt.verify)
        .calledWith(token, JWT_SECRET)
        .mockImplementation(() => {
          throw new Error();
        });
      const expectedError = new UnauthorizedError();
      const expectedResult = { message: expectedError.message };

      const { body } = await request(app)
        .get('/customers/65460cc7e174e81823ac62f4/portfolio-histories')
        .set('Authorization', `Bearer ${token}`)
        .expect(StatusCodes.UNAUTHORIZED);

      expect(body).toEqual(expectedResult);
    });
  });
});
