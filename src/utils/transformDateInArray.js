const transformDateInArray = (value) =>
  value.map((item) => {
    const itemWithDate = { ...item.toJSON(), date: item.createdAt };
    delete itemWithDate.createdAt;
    delete itemWithDate.updatedAt;
    return itemWithDate;
  });
export default transformDateInArray;
