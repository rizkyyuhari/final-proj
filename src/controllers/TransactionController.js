import { StatusCodes } from 'http-status-codes';

export default class TransactionController {
  #transactionService;

  constructor(transactionService) {
    this.#transactionService = transactionService;
    this.findAll = this.#findAll.bind(this);
    this.create = this.#create.bind(this);
  }

  async #findAll(request, response) {
    const { customerId } = request.params;
    const query = { customerId, ...request.query };
    const transactions = await this.#transactionService.findAll(query);
    response.status(StatusCodes.OK).json({ transactions });
  }

  async #create(request, response) {
    const { customerId } = request.params;
    const newTransaction = { customerId, ...request.body };
    await this.#transactionService.create(newTransaction);
    response.status(201).json();
  }
}
