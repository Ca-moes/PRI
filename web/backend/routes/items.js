const express = require('express');
const router = express.Router();
const controller = require('../controllers/items');

router.get('/:asin', controller.getItemByAsin);
router.get('/search/:query', controller.searchItem);

module.exports = router;
