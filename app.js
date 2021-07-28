require('dotenv').config();

const { PORT = 3000 } = process.env;
const DB_CONNECTION = 'mongodb://localhost:27017/movexplorerdb';

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors, Joi, celebrate } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/cors');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/error');

const app = express();
app.use(helmet());
app.use(express.json());

mongoose.connect(DB_CONNECTION, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

// обработка cors
app.use(corsHandler);

// запросы

app.use(errorLogger);
app.use(notFound);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
