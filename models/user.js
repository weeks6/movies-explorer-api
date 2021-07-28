const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validation = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validation.isEmail(v);
      },
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    return Promise.reject(
      new UnauthorizedError('Неправильные почта или пароль')
    );
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    return Promise.reject(
      new UnauthorizedError('Неправильные почта или пароль')
    );
  }
  return user;
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
