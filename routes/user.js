const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');

// const validateURL = require('../utils/validateURL');
const {
  currentUser,
  updateCurrentUser,
  signIn,
  createUser,
} = require('../controllers/user');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  signIn,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);

router.get('/users/me', auth, currentUser);

router.patch(
  '/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateCurrentUser,
);

module.exports = router;
