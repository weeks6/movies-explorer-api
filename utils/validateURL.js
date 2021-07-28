const validation = require('validator');
const ValidationError = require('../errors/ValidationError');

module.exports = (value) => {
  if (validation.isURL(value, { require_protocol: true })) {
    return value;
  }

  throw new ValidationError('Не корректная ссылка');
};
