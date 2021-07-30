const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');

// const validateURL = require('../utils/validateURL');
const { currentUser, updateCurrentUser } = require('../controllers/user');

router.get('/users/me', auth, currentUser);
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  auth,
  updateCurrentUser,
);

module.exports = router;
