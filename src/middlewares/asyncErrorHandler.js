const asyncErrorHandler = (callback) => {
  return async (request, response, next) => {
    try {
      await callback(request, response, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncErrorHandler;
