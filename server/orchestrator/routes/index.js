const router = require('express').Router();
const moviesRouter = require('./movies');
const tvRouter = require('./tvSeries');
const entertainmeRouter = require('./entertainme');

router.use('/entertainme', entertainmeRouter);
router.use('/movies', moviesRouter);
router.use('/tv', tvRouter);

module.exports = router