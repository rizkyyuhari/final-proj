import { StatusCodes } from 'http-status-codes';

export default class UnauthorizedError extends Error {
  #statusCode;

  constructor() {
    super('Invalid Token');
    this.#statusCode = StatusCodes.UNAUTHORIZED;
  }

  get statusCode() {
    return this.#statusCode;
  }
}
