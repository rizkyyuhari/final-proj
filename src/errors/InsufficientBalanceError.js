export default class InsufficientBalanceError extends Error {
  #statusCode;

  constructor() {
    super('Insufficient balance!');
    this.#statusCode = 400;
  }

  get statusCode() {
    return this.#statusCode;
  }
}
