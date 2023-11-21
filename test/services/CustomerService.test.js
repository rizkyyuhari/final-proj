import CustomerService from '../../src/services/CustomerService';
import customerResponse from '../fixtures/customer';

describe('CustomerService', () => {
  const customerModel = {
    findOne: jest.fn()
  };
  describe('^findOne', () => {
    it('should return customer Willy when input customer id 5', async () => {
      const customerService = new CustomerService(customerModel);
      const expectedResult = customerResponse;

      customerModel.findOne.mockResolvedValue(expectedResult.customers);
      const actualResult = await customerService.findById();

      expect(actualResult).toEqual(expectedResult.customers);
    });
  });
});
