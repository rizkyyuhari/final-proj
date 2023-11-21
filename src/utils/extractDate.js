import DateValidationError from '../errors/DateValidationError';

const extractDate = (query) => {
  let dateFrom = new Date();
  let dateTo = new Date();
  if (query.dateFrom) {
    dateFrom = new Date(query.dateFrom);
  }
  if (query.dateTo) {
    dateTo = new Date(query.dateTo);
  }
  if (dateFrom > dateTo) {
    throw new DateValidationError();
  }
  return { $gte: dateFrom, $lte: dateTo };
};

export default extractDate;
