const validateRequestMiddleware = (schema) => {
  return (request, response, next) => {
    const { error } = schema.validate(request.body);
    if (error) {
      const { message } = error.details[0];
      return response.status(400).json({ message });
    }
    return next();
  };
};

export default validateRequestMiddleware;
