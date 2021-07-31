require('dotenv').config();

const { PORT = 3000 } = process.env;
const { DB_CONNECTION = 'mongodb://localhost:27017/moviexplorerdb' } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors, Joi, celebrate } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/cors');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/error');
// const limiter = require('./middlewares/rateLimiter');

const { createUser, signIn } = require('./controllers/user');
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');

const app = express();
app.use(helmet());
app.use(express.json());
// app.use(limiter);

mongoose.connect(DB_CONNECTION, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(requestLogger);

// обработка cors
app.use(corsHandler);

// запросы
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  signIn,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);

app.use(userRouter);
app.use(movieRouter);

// ошибки
app.use(errorLogger);
app.use(notFound);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
