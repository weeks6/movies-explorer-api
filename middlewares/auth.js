const jwt = require('jsonwebtoken');

const { DEV_SECRET } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET = DEV_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err?.name === 'JsonWebTokenError') {
        throw new UnauthorizedError('Необходима авторизация');
      }

      if (err?.name === 'NotBeforeError') {
        throw new UnauthorizedError('Необходима авторизация');
      }
      if (!payload) {
        throw new UnauthorizedError('Необходима авторизация');
      }

      req.user = payload;
      next();
    });
  } catch (err) {
    next(err);
  }
};
