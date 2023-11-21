import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import app from '../../src/app';
import Customer from '../../src/models/Customer';
import IncorrectCredentialError from '../../src/errors/IncorrectCredentialError';

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
jest.mock('../../src/models/Customer', () => ({
  findOne: jest.fn()
}));

describe('AuthenticationController', () => {
  describe('POST /tokens', () => {
    it('should return the JWT token and status 200 OK when user exists in database', async () => {
      const expectedResult = { username: 'test', password: '123456' };
      const mockToken = 'token';
      Customer.findOne.mockReturnValue(expectedResult);
      jwt.sign.mockReturnValue(mockToken);
      bcrypt.compareSync.mockResolvedValue(true);
      const expectedToken = { token: mockToken };

      const { body } = await request(app)
        .post('/tokens')
        .send(expectedResult)
        .expect(StatusCodes.OK);

      expect(body).toEqual(expectedToken);
    });
    it('should return Username and/or password is incorrect message and status 400 Bad Request when user does not exist in database', async () => {
      const expectedError = new IncorrectCredentialError();
      const expectedResult = { message: expectedError.message };
      const customer = { username: 'test', password: '123456' };
      Customer.findOne.mockReturnValue(null);

      const { body } = await request(app)
        .post('/tokens')
        .send(customer)
        .expect(StatusCodes.BAD_REQUEST);

      expect(body).toEqual(expectedResult);
    });
  });
});
