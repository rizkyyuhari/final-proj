import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';

const authenticationMiddleware = (request, response, next) => {
  const authorizationHeader = request.get('Authorization');
  const { JWT_SECRET } = process.env;

  try {
    const token = authorizationHeader.replace('Bearer ', '');
    const decodedJwt = jwt.verify(token, JWT_SECRET);
    request.decodedJwt = decodedJwt;
    return next();
  } catch (error) {
    return next(new UnauthorizedError());
  }
};

export default authenticationMiddleware;
