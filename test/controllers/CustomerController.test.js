import { when } from 'jest-when';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../src/app';
import customerResponse from '../fixtures/customer';
import Customer from '../../src/models/Customer';

jest.mock('../../src/models/Customer', () => ({
  findOne: jest.fn()
}));

jest.mock('jsonwebtoken');

describe('CustomerController', () => {
  const { JWT_SECRET } = process.env;
  describe('GET /customers/:id', () => {
    it('should return customer Willy when input customer id 5', async () => {
      const foundUser = {
        username: 'rizky',
        password: '1234'
      };
      const token = 'validtoken';
      when(jwt.verify).calledWith(token, JWT_SECRET).mockReturnValue(foundUser);
      const expectedResult = customerResponse;
      Customer.findOne.mockResolvedValue(expectedResult);
      const { body } = await request(app)
        .get(`/customers/6548e650b1c6cd04394bdf6c`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual(expectedResult);
    });
  });
});
