const router = require('express').Router();
const movieRouter = require('./movie');
const userRouter = require('./user');

router.use(movieRouter);
router.use(userRouter);

module.exports = router;
