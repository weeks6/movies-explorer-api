require('dotenv').config();

const { PORT = 3000 } = process.env;
const DB_CONNECTION = 'mongodb://localhost:27017/movexplorerdb';

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(DB_CONNECTION, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
