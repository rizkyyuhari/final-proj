import request from 'supertest';
import app from '../../src/app';
import Transaction from '../../src/models/Transaction';
import Portfolio from '../../src/models/Portfolio';
import { transactionsResponse, customerId } from '../fixtures/transaction';
import ParameterValidationError from '../../src/errors/ParameterValidationError';
import InsufficientBalanceError from '../../src/errors/InsufficientBalanceError';
import Ticker from '../../src/models/Ticker';
import Customer from '../../src/models/Customer';
import NotEnoughCoinError from '../../src/errors/NotEnoughCoinError';

jest.mock('jsonwebtoken');
jest.mock('../../src/models/Transaction', () => ({
  find: jest.fn(),
  transform: jest.fn(),
  populate: jest.fn(),
  create: jest.fn(),
  aggregate: jest.fn()
}));

jest.mock('../../src/models/Portfolio', () => ({
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn()
}));

jest.mock('../../src/models/Ticker', () => ({
  findOne: jest.fn()
}));

jest.mock('../../src/models/Customer', () => ({
  findOne: jest.fn()
}));

beforeEach(() => {
  jest.clearAllMocks();
});
const token = 'validtoken';

describe('TransactionController', () => {
  describe('GET /customers/:customerId/transactions', () => {
    it('should return array of object transactions when called /customers/:customerId/transactions succesfully', async () => {
      const expectedResult = transactionsResponse;
      Transaction.aggregate.mockResolvedValue(expectedResult.transactions);

      const { body } = await request(app)
        .get(`/customers/${customerId}/transactions`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual(expectedResult);
    });

    it('should return array of object transactions when called /customers/:customerId/transactions succesfully', async () => {
      const error = new ParameterValidationError();
      const expectedResult = { message: error.message };
      const invalidId = '123';

      const { body } = await request(app)
        .get(`/customers/${invalidId}/transactions`)
        .set('Authorization', `Bearer ${token}`)

        .expect(error.statusCode);

      expect(body).toEqual(expectedResult);
    });
  });

  describe('POST /customers/:customerId/transactions', () => {
    it('should create new transaction based on given payload', async () => {
      const mockedPortfolio = { ticker: '123', amount: 1000, customer: '123' };
      Portfolio.findOne.mockResolvedValue(mockedPortfolio);
      Ticker.findOne.mockResolvedValue({
        _id: '654c5844846832501382ba44',
        name: 'Bitcoin',
        ticker: 'BTC',
        description:
          'Bitcoin is a decentralized digital currency. Bitcoin transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. The cryptocurrency was invented in 2008 by an unknown entity under the name Satoshi Nakamoto.'
      });
      Customer.findOne.mockResolvedValue({
        _id: '6548e650b1c6cd04394bdf6c',
        name: 'Test'
      });
      Transaction.create.mockResolvedValue();

      const { body } = await request(app)
        .post(`/customers/${customerId}/transactions`)
        .send({ amount: 1000, tickerId: '123', category: 'buy', fee: 1, totalPrice: 1000 })
        .set('Authorization', `Bearer ${token}`)
        .expect(201);

      expect(body).toEqual('');
    });

    it('should return insufficient balance error message when failed to create new transaction with category buy', async () => {
      const expectedResult = new InsufficientBalanceError();

      Portfolio.findOne.mockImplementation(() => {
        throw expectedResult;
      });

      const { body } = await request(app)
        .post(`/customers/${customerId}/transactions`)
        .send({ amount: 1000, tickerId: '123', category: 'buy', fee: 1, totalPrice: 1000 })
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(body).toEqual({ message: expectedResult.message });
    });

    it('should return not enough coin error message when failed to create new transaction with category sell', async () => {
      const expectedResult = new NotEnoughCoinError();
      Portfolio.findOne.mockImplementation(() => {
        throw expectedResult;
      });

      const { body } = await request(app)
        .post(`/customers/${customerId}/transactions`)
        .send({ amount: 1000, tickerId: '123', category: 'sell', fee: 1, totalPrice: 1000 })
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(body).toEqual({ message: expectedResult.message });
    });

    it('should return error message when given invalid payload', async () => {
      const { body } = await request(app)
        .post(`/customers/${customerId}/transactions`)
        .send({ amount: 1000, tickerId: '123', category: 'buy', fee: 1 })
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(body).toEqual({ message: '"totalPrice" is required' });
    });
  });
});
