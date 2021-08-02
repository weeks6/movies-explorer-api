const ValidationError = require('../errors/ValidationError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const Movie = require('../models/movie');
const { NOT_FOUND, NO_RIGHTS, CAST_ERROR } = require('../utils/errorMessages');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).populate(['owner']);

    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  const movie = {
    ...req.body,
  };

  movie.owner = req.user._id;

  try {
    const createdMovie = await Movie.create([movie], {
      runValidators: true,
    });
    res.status(201).send(createdMovie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError(err.message));
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  const { _id } = req.user;
  const { movieId } = req.params;
  try {
    const movieToDelete = await Movie.findOne({ _id: movieId });

    if (!movieToDelete) {
      throw new NotFoundError(NOT_FOUND);
    }

    if (movieToDelete.owner.toString() !== _id) {
      throw new ForbiddenError(NO_RIGHTS);
    }

    const removedMovie = await Movie.deleteOne({ _id: movieId }).orFail();
    res.send(removedMovie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(CAST_ERROR));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
