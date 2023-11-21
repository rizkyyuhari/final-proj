import { model, Schema } from 'mongoose';
import { toJSONOptions } from './options';

const portfolioSchema = Schema(
  {
    ticker: {
      type: Schema.Types.ObjectId,
      ref: 'Ticker'
    },
    amount: {
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

portfolioSchema.set('toJSON', toJSONOptions);

export default model('Portfolio', portfolioSchema, 'portfolio');
