import { model, Schema } from 'mongoose';
import { toJSONOptions } from './options';

const priceHistorySchema = Schema(
  {
    price: {
      type: Schema.Types.Number
    },
    ticker: {
      type: Schema.Types.ObjectId,
      ref: 'Ticker'
    }
  },
  {
    timestamps: true
  }
);

priceHistorySchema.set('toJSON', toJSONOptions);

export default model('PriceHistory', priceHistorySchema, 'price-history');
