export default class CustomerService {
  #customerModel;

  constructor(customerModel) {
    this.#customerModel = customerModel;
  }

  findById(customerId) {
    return this.#customerModel.findOne(
      { _id: customerId },
      {
        name: 1,
        username: 1,
        id: 1
      }
    );
  }
}
