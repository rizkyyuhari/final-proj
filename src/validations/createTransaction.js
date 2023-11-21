import Joi from 'joi';

const createTransaction = Joi.object({
  tickerId: Joi.string().required(),
  amount: Joi.number().required(),
  fee: Joi.number().required(),
  category: Joi.string().valid('buy', 'sell').required(),
  totalPrice: Joi.number().required()
});

export default createTransaction;
