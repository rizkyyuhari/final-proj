/* eslint-disable no-unused-vars */
const errorMiddleware = (error, _request, response, _next) => {
  response.status(error.statusCode || 500).json({ message: error.message });
};

export default errorMiddleware;
