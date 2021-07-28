const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

const createUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      email,
      password: hashedPassword,
      name: req.body.name,
    };

    const createdUser = (
      await User.create([userData], {
        runValidators: true,
      })
    )[0];

    delete createdUser._doc.password;

    res.status(201).send(createdUser);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError('При создании пользователя что-то пошло не так'));
    }

    if (err.name === 'ValidationError') {
      next(new ValidationError(err.message));
    }

    next(err);
  }
};

module.exports = {
  createUser,
};