const { Router } = require('express');

const router = Router();
const TenureController = require('../controllers/TenureController');
const checkAuth = require('../helpers/auth');

router.post('/', checkAuth, TenureController.createTenure);
router.get('/:tenureId', checkAuth, TenureController.getTenure);

module.exports = router;
