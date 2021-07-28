const NotFoundError = require('../errors/NotFoundError');

function notFound() {
  throw new NotFoundError('Страница не найдена');
}

module.exports = notFound;
