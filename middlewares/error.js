const { SERVER_ERROR } = require('../utils/errorMessages');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? SERVER_ERROR : message,
  });
}

module.exports = errorHandler;
