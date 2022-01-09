const express = require('express');
const router = express.Router();
const controller = require('../controllers/items');

router.get('/search', controller.searchItem);
router.get('/:asin', controller.getItemByAsin);

module.exports = router;
