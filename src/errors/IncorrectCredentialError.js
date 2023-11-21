import HttpStatus from 'http-status-codes';

class IncorrectCredentialError extends Error {
  #statusCode;

  constructor() {
    super('Username and/or password is incorrect');
    this.#statusCode = HttpStatus.BAD_REQUEST;
  }

  get statusCode() {
    return this.#statusCode;
  }
}

export default IncorrectCredentialError;
