const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviews');

router.get('/search', controller.searchReview);

module.exports = router;
