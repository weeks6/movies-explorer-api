const ALLOWED_CORS = [
  'localhost:3000',
  'https://weeks6.nomoredomains.club',
  'http://weeks6.nomoredomains.club',
];
const DEV_SECRET = 'b70ae086de87fcb0b45a2bc284c73e61227942526da2be6ebf4ea60d34e00254';

const MONGO_CONNECTION = 'mongodb://localhost:27017/moviexplorerdb';

const DEFAULT_PORT = 3000;

const JWT_EXPIRATION = '7d';

module.exports = {
  ALLOWED_CORS,
  DEV_SECRET,
  MONGO_CONNECTION,
  DEFAULT_PORT,
  JWT_EXPIRATION,
};
