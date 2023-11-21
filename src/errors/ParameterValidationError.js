export default class ParameterValidationError extends Error {
  #statusCode;

  constructor() {
    super('invalid customerId type');
    this.#statusCode = 400;
  }

  get statusCode() {
    return this.#statusCode;
  }
}
