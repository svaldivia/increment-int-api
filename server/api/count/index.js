'use strict';

const express = require('express');
const controller = require('./count.controller');

const router = express.Router();

router.get('/', controller.getCurrentCount);
router.put('/', controller.updateCurrentCount);
router.get('/next', controller.getNextCount);

module.exports = router;
