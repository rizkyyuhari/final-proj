import { removeMongoId } from '../../src/models/options';

describe('options', () => {
  describe('^removeMongoId', () => {
    it('should remove the _id from the object', () => {
      const object = {
        _id: '1',
        name: 'test'
      };
      const expectedResult = { name: object.name };

      removeMongoId(null, object);

      expect(object).toEqual(expectedResult);
    });
  });
});
