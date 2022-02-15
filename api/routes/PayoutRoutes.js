const express = require('express');
const router = express.Router();
const PayoutController = require('../controllers/PayoutController');

router.post('/', PayoutController.makePayout);
router.get('/:payoutId', PayoutController.getPayout);

module.exports = router;
