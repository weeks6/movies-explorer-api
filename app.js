require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/cors');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/error');
const limiter = require('./middlewares/rateLimiter');

const appRouter = require('./routes/index');
const { MONGO_CONNECTION, DEFAULT_PORT } = require('./utils/constants');

const { PORT = DEFAULT_PORT } = process.env;
const { DB_CONNECTION = MONGO_CONNECTION } = process.env;

const app = express();
app.use(helmet());
app.use(express.json());
app.use(limiter);

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
app.use(appRouter);

// ошибки
app.use(errorLogger);
app.use(notFound);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // console.log(`Server started on port ${PORT}`);
});
