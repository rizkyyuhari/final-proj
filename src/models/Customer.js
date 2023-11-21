import { model, Schema } from 'mongoose';
import { toJSONOptions } from './options';

const customerSchema = Schema(
  {
    name: {
      type: Schema.Types.String
    },
    username: {
      type: Schema.Types.String
    },
    password: {
      type: Schema.Types.String
    }
  },
  {
    timestamps: true
  }
);

customerSchema.set('toJSON', toJSONOptions);

export default model('Customer', customerSchema, 'customer');
