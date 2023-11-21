import DateValidationError from '../../src/errors/DateValidationError';
import PriceHistoryService from '../../src/services/PriceHistoryService';
import priceHistoryResponse from '../fixtures/priceHistory';

describe('PriceHistoryService', () => {
  const priceHistoryModel = {
    find: jest.fn(),
    populate: jest.fn(),
    transform: jest.fn()
  };

  describe('^findAll', () => {
    it('should return all list of price histories of ticker', async () => {
      const tickerService = new PriceHistoryService(priceHistoryModel);
      const expectedResult = priceHistoryResponse;

      priceHistoryModel.find.mockReturnThis();
      priceHistoryModel.populate.mockReturnThis();
      priceHistoryModel.transform.mockResolvedValue(expectedResult.priceHistories);
      const actualResult = await tickerService.findAll({});

      expect(actualResult).toEqual(expectedResult.priceHistories);
    });

    it('should return filtered list of price histories when given query dateFrom and dateTo', async () => {
      const tickerService = new PriceHistoryService(priceHistoryModel);
      const expectedResult = priceHistoryResponse;
      const query = {
        dateFrom: '2023-11-3',
        dateTo: '2023-11-5'
      };

      priceHistoryModel.find.mockReturnThis();
      priceHistoryModel.populate.mockReturnThis();
      priceHistoryModel.transform.mockResolvedValue(expectedResult.priceHistories);
      const actualResult = await tickerService.findAll(query);

      expect(actualResult).toEqual(expectedResult.priceHistories);
    });

    it('should return filtered list of price histories with ticker.name include Bitcoin', async () => {
      const tickerService = new PriceHistoryService(priceHistoryModel);
      const expectedResult = priceHistoryResponse;
      const query = {
        search: 'Bitcoin'
      };

      priceHistoryModel.find.mockReturnThis();
      priceHistoryModel.populate.mockReturnThis();
      priceHistoryModel.transform.mockResolvedValue(expectedResult.priceHistories);
      const actualResult = await tickerService.findAll(query);

      expect(actualResult).toEqual(expectedResult.priceHistories);
    });

    it('should return filtered list of price histories with ticker.ticker include BTC', async () => {
      const tickerService = new PriceHistoryService(priceHistoryModel);
      const expectedResult = priceHistoryResponse;
      const query = {
        search: 'BTC'
      };

      priceHistoryModel.find.mockReturnThis();
      priceHistoryModel.populate.mockReturnThis();
      priceHistoryModel.transform.mockResolvedValue(expectedResult.priceHistories);
      const actualResult = await tickerService.findAll(query);

      expect(actualResult).toEqual(expectedResult.priceHistories);
    });

    it('should return error DateValidationError when dateFrom is bigger than dateTo', async () => {
      const tickerService = new PriceHistoryService(priceHistoryModel);
      const query = {
        dateFrom: '2023-11-5',
        dateTo: '2023-11-3'
      };
      const error = new DateValidationError();

      const actualResult = async () => {
        await tickerService.findAll(query);
      };

      expect(actualResult).rejects.toThrow(error);
    });
  });
});
