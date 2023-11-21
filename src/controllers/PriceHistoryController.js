export default class PriceHistoryController {
  #priceHistoryService;

  constructor(priceHistoryService) {
    this.#priceHistoryService = priceHistoryService;
    this.findAll = this.#findAll.bind(this);
  }

  async #findAll(request, response) {
    const { query } = request;
    const { date_from: dateFrom, date_to: dateTo, search } = query;
    const payload = { dateFrom, dateTo, search };
    const priceHistories = await this.#priceHistoryService.findAll(payload);
    response.status(200).json({ priceHistories });
  }
}
