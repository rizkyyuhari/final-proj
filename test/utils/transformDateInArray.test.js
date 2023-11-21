const { default: transformDateInArray } = require('../../src/utils/transformDateInArray');

describe('transformDate', () => {
  it('should return an array of object with date attribute and without createdAt/updatedAt attribute', () => {
    const arrayOfObject = [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        toJSON: () => this
      }
    ];
    const expectedResult = arrayOfObject.map((item) => ({ id: item.id, date: item.createdAt }));

    const actualResult = transformDateInArray(arrayOfObject);

    expect(actualResult).toEqual(expectedResult);
  });
});
