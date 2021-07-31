const rateLimit = require('express-rate-limit');

const windowMs = 15 * 60 * 1000; // 15 minutes

const limiter = rateLimit({
  windowMs,
  max: 100,
});

export default limiter;
