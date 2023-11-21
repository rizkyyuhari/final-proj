export default class CustomerController {
  #customerService;

  constructor(customerService) {
    this.#customerService = customerService;
    this.findOne = this.#findOne.bind(this);
  }

  async #findOne(request, response) {
    const { customerId } = request.params;
    const customer = await this.#customerService.findById(customerId);
    response.status(200).json(customer);
  }
}
