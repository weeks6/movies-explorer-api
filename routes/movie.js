const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');

const validateURL = require('../utils/validateURL');

// const validateURL = require('../utils/validateURL');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');

router.get('/movies', auth, getMovies);
router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().custom(validateURL).required(),
      trailer: Joi.string().custom(validateURL).required(),
      thumbnail: Joi.string().custom(validateURL).required(),
      movieId: Joi.string().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  auth,
  createMovie
);

router.delete(
  '/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().min(24).required().hex(),
    }),
  }),
  auth,
  deleteMovie
);

module.exports = router;
