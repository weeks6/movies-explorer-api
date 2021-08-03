const validation = require('validator');
const ValidationError = require('../errors/ValidationError');
const { INCORRECT_LINK } = require('./errorMessages');

module.exports = (value) => {
  if (validation.isURL(value, { require_protocol: true })) {
    return value;
  }

  throw new ValidationError(INCORRECT_LINK);
};
