export default class NotEnoughCoinError extends Error {
  #statusCode;

  constructor() {
    super('Not Enough Coin');
    this.#statusCode = 400;
  }

  get statusCode() {
    return this.#statusCode;
  }
}
