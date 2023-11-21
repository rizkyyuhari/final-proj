export default class TickerController {
  #tickerService;

  constructor(tickerService) {
    this.#tickerService = tickerService;
    this.findAll = this.#findAll.bind(this);
    this.findOne = this.#findOne.bind(this);
  }

  async #findAll(_, response) {
    const tickers = await this.#tickerService.findAll();
    response.status(200).json({ tickers });
  }

  async #findOne(request, response) {
    const { id } = request.params;
    const customer = await this.#tickerService.findById(id);
    response.status(200).json(customer);
  }
}
