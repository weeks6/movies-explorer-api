const rateLimit = require('express-rate-limit');

const windowMs = 15 * 60 * 1000; // 15 minutes

module.exports = rateLimit({
  windowMs,
  max: 100,
});
