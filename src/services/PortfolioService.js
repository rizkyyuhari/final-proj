import extractDate from '../utils/extractDate';
import transformDateInArray from '../utils/transformDateInArray';

export default class PortfolioService {
  #portfolio;

  #tickerService;

  #customerService;

  constructor(portfolio, tickerService, customerService) {
    this.#portfolio = portfolio;
    this.#tickerService = tickerService;
    this.#customerService = customerService;
  }

  async findAllByCustomerId(payload) {
    const { customerId, dateFrom, dateTo } = payload;
    let options = { customer: customerId, createdAt: PortfolioService.#filterByDateNow() };
    if (dateFrom || dateTo) {
      options = {
        createdAt: extractDate({ dateFrom, dateTo })
      };
    }
    const responseData = await this.#portfolio
      .find(options)
      .sort({ createdAt: 'asc' })
      .populate('ticker')
      .transform(transformDateInArray);
    return Object.values(PortfolioService.#groupedByDate(responseData));
  }

  static #filterByDateNow() {
    const dateFrom = new Date();
    dateFrom.setHours(0, 0, 0, 0);
    const dateTo = new Date();
    dateTo.setHours(0, 0, 0, 0);
    return { $gte: dateFrom, $lte: dateTo };
  }

  static #groupedByDate(portfolios) {
    return portfolios.reduce((previousPortfolio, currentPortfolio) => {
      const { date } = currentPortfolio;
      const newPreviousPortfolio = { ...previousPortfolio };
      if (!newPreviousPortfolio[date]) {
        newPreviousPortfolio[date] = { date, tickers: [] };
      }
      newPreviousPortfolio[date].tickers.push({
        ticker: currentPortfolio.ticker.ticker,
        amount: currentPortfolio.amount,
        id: currentPortfolio.ticker.id
      });
      return newPreviousPortfolio;
    }, {});
  }

  findOneByTickerIdAndDate({ ticker, date }) {
    return this.#portfolio.findOne({ ticker, createdAt: date });
  }

  async create(portfolio) {
    const ticker = await this.#tickerService.findById(portfolio.ticker);
    const customer = await this.#customerService.findById(portfolio.customer);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.#portfolio.create({
      amount: portfolio.amount,
      ticker,
      customer,
      createdAt: today,
      updatedAt: today
    });
  }

  updateByTickerAndDate(portfolio) {
    const RUPIAH_TICKER_ID = '654b1142b811bfd8313a274b';
    if (Number(portfolio.amount) === 0 && portfolio.id !== RUPIAH_TICKER_ID) {
      return this.#portfolio.deleteOne({
        ticker: portfolio.id,
        createdAt: portfolio.date
      });
    }
    return this.#portfolio.findOneAndUpdate(
      { ticker: portfolio.id, createdAt: portfolio.date },
      { amount: portfolio.amount },
      { new: true }
    );
  }
}
