const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

const { DEV_SECRET, JWT_EXPIRATION } = require('../utils/constants');
const {
  EMAIL_USED,
  AUTH_SUCCESS,
  WRONG_EMAIL,
  NOT_FOUND,
} = require('../utils/errorMessages');

const { JWT_SECRET = DEV_SECRET } = process.env;

// регистрация нового пользователя
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
      next(new ConflictError(EMAIL_USED));
    }

    if (err.name === 'ValidationError') {
      next(new ValidationError(err.message));
    }

    next(err);
  }
};

// авторизация пользователя
const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION,
      },
    );

    res.send({
      message: AUTH_SUCCESS,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// пользователь по id
const currentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findOne({ _id });

    if (!user) {
      throw new NotFoundError(NOT_FOUND);
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
};

// обновление инфы о пользователе
const updateCurrentUser = async (req, res, next) => {
  const { _id } = req.user;
  const user = {
    ...req.body,
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id },
      { ...user },
      { new: true, runValidators: true },
    );

    res.send(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError(err.message));
    }

    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError(WRONG_EMAIL));
    }

    next(err);
  }
};

module.exports = {
  createUser,
  signIn,
  currentUser,
  updateCurrentUser,
};
