export default class DateValidationError extends Error {
  #statusCode;

  constructor() {
    super('dateFrom cannot be after dateTo or after today`s date');
    this.#statusCode = 400;
  }

  get statusCode() {
    return this.#statusCode;
  }
}
