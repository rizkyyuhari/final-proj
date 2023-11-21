import TickerService from '../../src/services/TickerService';
import tickersResponse from '../fixtures/ticker';

describe('TickerService', () => {
  const tickerModel = {
    find: jest.fn(),
    findOne: jest.fn()
  };

  describe('^findAll', () => {
    it('should return list of tickers', async () => {
      const tickerService = new TickerService(tickerModel);
      const expectedResult = tickersResponse;

      tickerModel.find.mockResolvedValue(expectedResult.tickers);
      const actualResult = await tickerService.findAll();

      expect(actualResult).toEqual(expectedResult.tickers);
    });
  });

  describe('^findOne', () => {
    it('should return ticker btc when input ticker id 5', async () => {
      const tickerService = new TickerService(tickerModel);
      const expectedResult = tickersResponse;

      tickerModel.findOne.mockResolvedValue(expectedResult.tickers);
      const actualResult = await tickerService.findById();

      expect(actualResult).toEqual(expectedResult.tickers);
    });
  });
});
