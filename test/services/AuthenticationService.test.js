import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import IncorrectCredentialError from '../../src/errors/IncorrectCredentialError';
import AuthenticationService from '../../src/services/AuthenticationService';

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('AuthenticationService', () => {
  const mockCustomer = {
    findOne: jest.fn()
  };
  describe('^authenticateUser', () => {
    it('should not sign JWT token and throw error when given user does not exist in database', async () => {
      const customer = {
        username: 'test',
        password: '123456'
      };
      mockCustomer.findOne.mockResolvedValue(null);
      const expectedError = new IncorrectCredentialError();
      const authenticationService = new AuthenticationService(mockCustomer);
      const actualResult = () => authenticationService.authenticateCustomer(customer);

      await expect(actualResult()).rejects.toThrow(expectedError);
    });

    it("should not sign JWT token and throw error when given password di'not match", async () => {
      const customer = {
        username: 'test',
        password: '123456'
      };
      mockCustomer.findOne.mockResolvedValue(customer);
      const expectedError = new IncorrectCredentialError();
      const authenticationService = new AuthenticationService(mockCustomer);
      const actualResult = () => authenticationService.authenticateCustomer(customer);

      await expect(actualResult()).rejects.toThrow(expectedError);
    });
    it('should search a user with given username and password, sign JWT token and return the token when user exists in database', async () => {
      const foundUser = {
        username: 'test',
        password: '123456'
      };
      const mockToken = 'token';
      mockCustomer.findOne.mockReturnValue(foundUser);
      bcrypt.compareSync.mockResolvedValue(true);
      jwt.sign.mockReturnValue(mockToken);
      const expectedResult = { token: mockToken };
      const authenticationService = new AuthenticationService(mockCustomer);

      const actualResult = await authenticationService.authenticateCustomer(expectedResult);

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
