import { model, Schema } from 'mongoose';
import { toJSONOptions } from './options';

const tickerSchema = new Schema(
  {
    name: {
      type: Schema.Types.String
    },
    ticker: {
      type: Schema.Types.String
    },
    description: {
      type: Schema.Types.String
    }
  },
  {
    timestamps: true
  }
);

tickerSchema.set('toJSON', toJSONOptions);

export default model('Ticker', tickerSchema, 'ticker');
