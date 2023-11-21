import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import IncorrectCredentialError from '../errors/IncorrectCredentialError';

export default class AuthenticationService {
  #customer;

  constructor(customer) {
    this.#customer = customer;
  }

  async authenticateCustomer(userAccount) {
    const { username, password } = userAccount;
    const existingUser = await this.#customer.findOne({ username });
    if (!existingUser) throw new IncorrectCredentialError();
    const isPasswordMatch = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordMatch) throw new IncorrectCredentialError();
    const { JWT_SECRET, JWT_EXPIRATION } = process.env;
    const payload = JSON.parse(
      JSON.stringify(AuthenticationService.#transformCustomerData(existingUser))
    );
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return { token };
  }

  static #transformCustomerData(customer) {
    return {
      id: customer.id,
      name: customer.name,
      username: customer.username
    };
  }
}
