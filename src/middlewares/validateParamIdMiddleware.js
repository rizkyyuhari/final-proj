import mongoose from 'mongoose';
import ParameterValidationError from '../errors/ParameterValidationError';

const validateParamIdMiddleware = () => {
  return (request, response, next) => {
    const { customerId } = request.params;
    const isIdValid = mongoose.isValidObjectId(customerId);
    if (!isIdValid) {
      return response.status(400).json({ message: new ParameterValidationError().message });
    }
    return next();
  };
};

export default validateParamIdMiddleware;
