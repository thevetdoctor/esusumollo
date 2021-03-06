const { Router } = require('express');

const router = Router();
const PayoutController = require('../controllers/PayoutController');
const checkAuth = require('../helpers/auth');

router.post('/', checkAuth, PayoutController.makePayout);
router.get('/:payoutId', checkAuth, PayoutController.getPayout);

module.exports = router;
