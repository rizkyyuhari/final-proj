import { model, Schema } from 'mongoose';
import { toJSONOptions } from './options';

const transactionSchema = Schema(
  {
    ticker: {
      type: Schema.Types.ObjectId,
      ref: 'Ticker'
    },
    amount: {
      type: Schema.Types.Number
    },
    fee: {
      type: Schema.Types.Number
    },
    category: {
      type: Schema.Types.String,
      enum: ['buy', 'sell']
    },
    totalPrice: {
      type: Schema.Types.Number
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
    }
  },
  {
    timestamps: true
  }
);

transactionSchema.set('toJSON', toJSONOptions);

export default model('Transaction', transactionSchema, 'transaction');
