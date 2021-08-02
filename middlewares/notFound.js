const NotFoundError = require('../errors/NotFoundError');
const { PAGE_NOT_FOUND } = require('../utils/errorMessages');

function notFound() {
  throw new NotFoundError(PAGE_NOT_FOUND);
}

module.exports = notFound;
