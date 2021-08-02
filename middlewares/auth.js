const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { DEV_SECRET } = require('../utils/constants');
const { AUTH_REQUIRED } = require('../utils/errorMessages');

const { JWT_SECRET = DEV_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError(AUTH_REQUIRED);
    }
    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err?.name === 'JsonWebTokenError') {
        throw new UnauthorizedError(AUTH_REQUIRED);
      }

      if (err?.name === 'NotBeforeError') {
        throw new UnauthorizedError(AUTH_REQUIRED);
      }
      if (!payload) {
        throw new UnauthorizedError(AUTH_REQUIRED);
      }

      req.user = payload;
      next();
    });
  } catch (err) {
    next(err);
  }
};
