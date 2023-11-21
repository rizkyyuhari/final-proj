export default class TickerService {
  #tickerModel;

  constructor(tickerModel) {
    this.#tickerModel = tickerModel;
  }

  findAll() {
    return this.#tickerModel.find(
      {},
      {
        name: 1,
        ticker: 1,
        id: 1,
        description: 1
      }
    );
  }

  findById(tickerId) {
    return this.#tickerModel.findOne(
      { _id: tickerId },
      {
        name: 1,
        ticker: 1,
        id: 1,
        description: 1
      }
    );
  }
}
