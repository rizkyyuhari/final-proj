import InsufficientBalanceError from '../../src/errors/InsufficientBalanceError';
import NotEnoughCoinError from '../../src/errors/NotEnoughCoinError';
import TransactionService from '../../src/services/TransactionService';
import { transactionsResponse, customerId } from '../fixtures/transaction';

describe('TransactionService', () => {
  const transactionModel = {
    find: jest.fn(),
    transform: jest.fn(),
    populate: jest.fn(),
    updatePortfolio: jest.fn(),
    create: jest.fn(),
    aggregate: jest.fn()
  };

  const portfolioService = {
    findOneByTickerIdAndDate: jest.fn(),
    updateByTickerAndDate: jest.fn(),
    create: jest.fn()
  };

  const tickerService = {
    findById: jest.fn()
  };

  const customerService = {
    findById: jest.fn()
  };

  describe('^findAll', () => {
    it('should return list of transactions', async () => {
      const transactionService = new TransactionService(transactionModel);
      const expectedResult = transactionsResponse.transactions;
      const query = { customerId, ticker: undefined, category: undefined, sort: undefined };

      transactionModel.aggregate.mockResolvedValue(expectedResult);
      const actualResult = await transactionService.findAll(query);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return list of transactions ascending by date', async () => {
      const transactionService = new TransactionService(transactionModel);
      const expectedResult = transactionsResponse.transactions;
      const query = { customerId, ticker: undefined, category: undefined, sort: 'ascending' };

      transactionModel.aggregate.mockResolvedValue(transactionsResponse.transactions);
      const actualResult = await transactionService.findAll(query);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return list of transactions filtered by ticker BTC', async () => {
      const transactionService = new TransactionService(transactionModel);
      const expectedResult = transactionsResponse.transactions
        .filter((transaction) => transaction.ticker.ticker === 'BTC')
        .sort(
          (transactionOne, transactionTwo) =>
            new Date(transactionTwo.date) - new Date(transactionOne.date)
        );
      const query = { customerId, ticker: 'BTC', category: undefined, sort: undefined };

      transactionModel.aggregate.mockResolvedValue(expectedResult);
      const actualResult = await transactionService.findAll(query);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return list of transactions filtered by category buy', async () => {
      const transactionService = new TransactionService(transactionModel);
      const expectedResult = transactionsResponse.transactions
        .filter((transaction) => transaction.category === 'buy')
        .sort(
          (transactionOne, transactionTwo) =>
            new Date(transactionTwo.date) - new Date(transactionOne.date)
        );
      const query = { customerId, ticker: undefined, category: 'buy', sort: undefined };

      transactionModel.aggregate.mockResolvedValue(expectedResult);
      const actualResult = await transactionService.findAll(query);

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('^create', () => {
    it("should throw InsufficientBalanceError when ticker's amount is less than new transaction's totalPrice and the transaction cateogry is buy", () => {
      portfolioService.findOneByTickerIdAndDate.mockResolvedValue({ amount: 500 });
      const transactionService = new TransactionService(transactionModel, portfolioService);

      const actualResult = () => transactionService.create({ totalPrice: 1000, category: 'buy' });

      expect(actualResult).rejects.toThrow(new InsufficientBalanceError());
    });

    it("should throw NotEnoughCoinError when ticker's amount is less than new transaction's amount and the transaction cateogry is sell", () => {
      portfolioService.findOneByTickerIdAndDate.mockResolvedValue({ amount: 500 });
      const transactionService = new TransactionService(transactionModel, portfolioService);

      const actualResult = () => transactionService.create({ amount: 1000, category: 'sell' });

      expect(actualResult).rejects.toThrow(new NotEnoughCoinError());
    });

    it("should called updatePortfolio when ticker's amount is greater than new transaction's amount", async () => {
      portfolioService.findOneByTickerIdAndDate.mockResolvedValue({ amount: 1500 });
      tickerService.findById.mockResolvedValue({
        _id: '654c5844846832501382ba44',
        name: 'Bitcoin',
        ticker: 'BTC',
        description:
          'Bitcoin is a decentralized digital currency. Bitcoin transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. The cryptocurrency was invented in 2008 by an unknown entity under the name Satoshi Nakamoto.'
      });
      customerService.findById.mockResolvedValue({
        _id: '6548e650b1c6cd04394bdf6c',
        name: 'Test'
      });
      transactionModel.create.mockResolvedValue();
      const transactionService = new TransactionService(
        transactionModel,
        portfolioService,
        tickerService,
        customerService
      );

      await transactionService.create({ amount: 1000 });

      expect(portfolioService.updateByTickerAndDate).toHaveBeenCalled();
    });

    it('should create new portfolio when haven\t bought the ticker', async () => {
      portfolioService.findOneByTickerIdAndDate
        .mockResolvedValueOnce({ amount: 1500 })
        .mockResolvedValueOnce(null);
      tickerService.findById.mockResolvedValue({
        _id: '654c5844846832501382ba44',
        name: 'Bitcoin',
        ticker: 'BTC',
        description:
          'Bitcoin is a decentralized digital currency. Bitcoin transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. The cryptocurrency was invented in 2008 by an unknown entity under the name Satoshi Nakamoto.'
      });
      customerService.findById.mockResolvedValue({
        _id: '6548e650b1c6cd04394bdf6c',
        name: 'Test'
      });
      transactionModel.create.mockResolvedValue();
      const transactionService = new TransactionService(
        transactionModel,
        portfolioService,
        tickerService,
        customerService
      );

      await transactionService.create({ amount: 1000, category: 'buy' });

      expect(portfolioService.create).toHaveBeenCalled();
    });
  });
});
