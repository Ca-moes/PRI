const express = require('express');
const router = express.Router();
const controller = require('../controllers/items');

//router.get('/', controller.getAllItems);
router.get('/:asin', controller.getItemByAsin);

module.exports = router;
