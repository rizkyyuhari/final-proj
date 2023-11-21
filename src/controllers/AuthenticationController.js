import { StatusCodes } from 'http-status-codes';

export default class AuthenticationController {
  #authentication;

  constructor(authentication) {
    this.#authentication = authentication;
    this.login = this.#login.bind(this);
  }

  async #login(request, response) {
    const customer = request.body;
    const token = await this.#authentication.authenticateCustomer(customer);
    response.status(StatusCodes.OK).send(token);
  }
}
