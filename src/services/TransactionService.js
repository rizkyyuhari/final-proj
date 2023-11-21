/* eslint-disable max-lines-per-function */
import bigDecimal from 'js-big-decimal';
import mongoose from 'mongoose';
import InsufficientBalanceError from '../errors/InsufficientBalanceError';
import NotEnoughCoinError from '../errors/NotEnoughCoinError';

const today = new Date();
today.setHours(0, 0, 0, 0);

export default class TransactionService {
  #transactionModel;

  #portfolioService;

  #tickerService;

  #customerService;

  constructor(transactionModel, portfolioService, tickerService, customerService) {
    this.#transactionModel = transactionModel;
    this.#portfolioService = portfolioService;
    this.#tickerService = tickerService;
    this.#customerService = customerService;
  }

  async findAll(query) {
    const { limit = 10, page = 1 } = query;
    return this.#transactionModel.aggregate([
      {
        $lookup: {
          from: 'ticker',
          localField: 'ticker',
          foreignField: '_id',
          as: 'ticker'
        }
      },
      {
        $unwind: '$ticker'
      },
      {
        $match: {
          'ticker.ticker': { $regex: query.ticker ?? '', $options: 'i' },
          customer: new mongoose.Types.ObjectId(query.customerId)
        }
      },
      {
        $project: {
          amount: 1,
          category: 1,
          date: '$createdAt',
          id: '$_id',
          'ticker.ticker': 1,
          'ticker.id': '$ticker._id',
          totalPrice: 1,
          _id: 0
        }
      },
      {
        $sort: {
          date: query.sort ? 1 : -1
        }
      },
      {
        $skip: (Number(page) - 1) * Number(limit)
      },
      {
        $limit: Number(limit)
      }
    ]);
  }

  create(newTransaction) {
    if (newTransaction.category === 'buy') {
      return this.#buy(newTransaction);
    }
    return this.#sell(newTransaction);
  }

  async #buy(newTransaction) {
    const rupiahTicker = await this.#portfolioService.findOneByTickerIdAndDate({
      ticker: '654b1142b811bfd8313a274b',
      date: today
    });
    if (rupiahTicker.amount < newTransaction.totalPrice) {
      throw new InsufficientBalanceError();
    }
    await this.#updateBalance(
      newTransaction,
      (rupiahTicker.amount - newTransaction.totalPrice).toFixed(2)
    );
    await this.#createNewTransaction(newTransaction);
  }

  async #sell(newTransaction) {
    const ticker = await this.#portfolioService.findOneByTickerIdAndDate({
      ticker: newTransaction.tickerId,
      date: today
    });
    if (ticker.amount < newTransaction.amount) {
      throw new NotEnoughCoinError();
    }
    await this.#portfolioService.updateByTickerAndDate({
      id: newTransaction.tickerId,
      amount: bigDecimal.subtract(ticker.amount, newTransaction.amount),
      date: today
    });
    const rupiahTicker = await this.#portfolioService.findOneByTickerIdAndDate({
      ticker: '654b1142b811bfd8313a274b',
      date: today
    });
    await this.#portfolioService.updateByTickerAndDate({
      id: '654b1142b811bfd8313a274b',
      amount: rupiahTicker.amount + newTransaction.totalPrice,
      date: today
    });
    await this.#createNewTransaction(newTransaction);
  }

  async #updateBalance(newTransaction, newBalance) {
    await this.#portfolioService.updateByTickerAndDate({
      id: '654b1142b811bfd8313a274b',
      amount: newBalance,
      date: today
    });
    await this.#updatePortfolio(newTransaction);
  }

  async #updatePortfolio(newTransaction) {
    const { tickerId: ticker, amount, customerId: customer } = newTransaction;
    const tickerAlreadyBought = await this.#portfolioService.findOneByTickerIdAndDate({
      ticker,
      date: today
    });
    if (!tickerAlreadyBought) {
      return this.#portfolioService.create({ ticker, amount, customer });
    }
    return this.#portfolioService.updateByTickerAndDate({
      id: ticker,
      amount: bigDecimal.add(amount, tickerAlreadyBought.amount),
      date: today
    });
  }

  async #createNewTransaction(payload) {
    const ticker = await this.#tickerService.findById(payload.tickerId);
    const customer = await this.#customerService.findById(payload.customerId);
    await this.#transactionModel.create({
      ticker,
      amount: payload.amount,
      fee: payload.fee,
      category: payload.category,
      totalPrice: payload.totalPrice,
      customer
    });
  }
}
