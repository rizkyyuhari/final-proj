/* eslint-disable max-lines-per-function */
import extractDate from '../utils/extractDate';
import transformDateInArray from '../utils/transformDateInArray';

export default class PriceHistoryService {
  #priceHistoryModel;

  constructor(priceHistoryModel) {
    this.#priceHistoryModel = priceHistoryModel;
  }

  async findAll(query) {
    let options = {};

    if (query.dateFrom || query.dateTo) {
      options = {
        ...options,
        createdAt: extractDate(query)
      };
    }

    const priceHistories = await this.#priceHistoryModel
      .find(options)
      .populate({ path: 'ticker', select: { name: 1, ticker: 1 } })
      .transform(transformDateInArray);

    if (query.search) {
      const searchText = query.search.toLowerCase();
      return priceHistories.filter((priceHistory) => {
        return (
          priceHistory.ticker.name.toLowerCase().includes(searchText) ||
          priceHistory.ticker.ticker.toLowerCase().includes(searchText)
        );
      });
    }

    return priceHistories;
  }
}
