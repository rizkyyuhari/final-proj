import DateValidationError from '../../src/errors/DateValidationError';
import extractDate from '../../src/utils/extractDate';

describe('extractDate', () => {
  const realDate = Date;
  beforeAll(() => {
    global.Date = class extends Date {
      constructor(date) {
        super(date ?? '2023-11-4');
      }
    };
  });

  afterAll(() => {
    global.Date = realDate;
  });

  it('should return $gte equal to dateFrom and $lte equal to today`s date', () => {
    const query = {
      dateFrom: '2023-11-3'
    };
    const expectedResult = { $gte: new Date(query.dateFrom), $lte: new Date() };

    const actualResult = extractDate(query);

    expect(actualResult).toEqual(expectedResult);
  });

  it('should return $lte equal to dateTo and $gte equal to today`s date', () => {
    const query = {
      dateTo: '2023-11-5'
    };
    const expectedResult = { $lte: new Date(query.dateTo), $gte: new Date() };

    const actualResult = extractDate(query);

    expect(actualResult).toEqual(expectedResult);
  });

  it('should return $lte equal to dateTo and $gte equal to today`s date', () => {
    const query = {
      dateFrom: '2023-11-3',
      dateTo: '2023-11-5'
    };
    const expectedResult = { $gte: new Date(query.dateFrom), $lte: new Date(query.dateTo) };

    const actualResult = extractDate(query);

    expect(actualResult).toEqual(expectedResult);
  });

  it('should return $lte equal to dateTo and $gte equal to today`s date', () => {
    const query = {
      dateFrom: '2023-11-5',
      dateTo: '2023-11-3'
    };
    const error = new DateValidationError();

    const actualResult = () => {
      extractDate(query);
    };

    expect(actualResult).toThrow(error);
  });
});
