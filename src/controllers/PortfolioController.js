import { StatusCodes } from 'http-status-codes';

export default class PortfolioController {
  #portfolioService;

  constructor(portfolioService) {
    this.#portfolioService = portfolioService;
    this.findAllByCustomerId = this.#findAllByCustomerId.bind(this);
  }

  async #findAllByCustomerId(request, response) {
    const { customerId } = request.params;
    const { date_from: dateFrom, date_to: dateTo } = request.query;
    const payload = { dateFrom, dateTo, customerId };
    const portfolios = await this.#portfolioService.findAllByCustomerId(payload);
    response.status(StatusCodes.OK).send({ portfolios });
  }
}
