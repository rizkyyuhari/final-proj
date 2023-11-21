import PortfolioService from '../../src/services/PortfolioService';
import { portfolios, portfolioServiceResult } from '../fixtures/portfolio';

const mockPortfolio = {
  find: jest.fn(),
  populate: jest.fn(),
  transform: jest.fn(),
  sort: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn()
};

const mockTickerService = {
  findById: jest.fn()
};

const mockCustomerService = {
  findById: jest.fn()
};

beforeEach(() => {
  jest.clearAllMocks();
});
describe('PortfolioService', () => {
  describe('^findAllByCustomerId', () => {
    it('should return list of portfolio of a customer', async () => {
      const expectedResult = portfolioServiceResult;
      mockPortfolio.find.mockReturnThis();
      mockPortfolio.sort.mockReturnThis();
      mockPortfolio.populate.mockReturnThis();
      mockPortfolio.transform.mockResolvedValue(portfolios);
      const payload = { customerId: '65460cc7e174e81823ac62f4' };
      const portfoliosService = new PortfolioService(mockPortfolio);

      const actualResult = await portfoliosService.findAllByCustomerId(payload);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return list of portfolio of a customer with given query dateForm and dateTo', async () => {
      const expectedResult = portfolioServiceResult;
      mockPortfolio.find.mockReturnThis();
      mockPortfolio.sort.mockReturnThis();
      mockPortfolio.populate.mockReturnThis();
      mockPortfolio.transform.mockResolvedValue(portfolios);
      const payload = {
        customerId: '65460cc7e174e81823ac62f4',
        dateFrom: '2023-11-04',
        dateTo: '2023-11-05'
      };
      const portfoliosService = new PortfolioService(mockPortfolio);

      const actualResult = await portfoliosService.findAllByCustomerId(payload);

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('^findOneByTickerIdAndDate', () => {
    it('should return a portfolio based on given ticker and date', async () => {
      const expectedResult = { ticker: '123', amount: 1000, customer: '123' };
      mockPortfolio.findOne.mockResolvedValue(expectedResult);
      const portfolioService = new PortfolioService(mockPortfolio);

      const actualResult = await portfolioService.findOneByTickerIdAndDate({
        ticker: '123',
        date: new Date()
      });

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('^create', () => {
    it('should successfully create a portfolio based on given payload', async () => {
      mockTickerService.findById.mockResolvedValue({
        name: 'ticker',
        ticker: 'IDR',
        description: 'Indonesia Rupiah'
      });
      mockCustomerService.findById.mockResolvedValue({
        name: 'test',
        username: 'test',
        password: 'test'
      });
      const expectedResult = {
        ticker: '123',
        amount: 1000,
        customer: '123',
        id: '1'
      };
      mockPortfolio.create.mockResolvedValue(expectedResult);
      const portfolioService = new PortfolioService(
        mockPortfolio,
        mockTickerService,
        mockCustomerService
      );

      const actualResult = await portfolioService.create({
        ticker: '123',
        amount: 1000,
        customer: '123'
      });

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('^updateByTickerAndDate', () => {
    it('should return updated ticker based on given portfolio', async () => {
      const expectedResult = { ticker: '123', amount: 1000, customer: '123' };
      mockPortfolio.findOneAndUpdate.mockResolvedValue(expectedResult);
      const portfolioService = new PortfolioService(mockPortfolio);

      const actualResult = await portfolioService.updateByTickerAndDate({
        ticker: '123',
        amount: 1000,
        customer: '123'
      });

      expect(actualResult).toEqual(expectedResult);
    });

    it('should remove ticker from portfolio when its amount is 0', async () => {
      const portfolioService = new PortfolioService(mockPortfolio);
      const date = new Date();

      await portfolioService.updateByTickerAndDate({
        id: '123',
        amount: 0,
        date
      });

      expect(mockPortfolio.deleteOne).toHaveBeenNthCalledWith(1, {
        ticker: '123',
        createdAt: date
      });
    });
  });
});
