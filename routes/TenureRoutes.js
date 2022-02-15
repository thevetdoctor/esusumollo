const express = require('express');
const router = express.Router();
const TenureController = require('../controllers/TenureController');

router.post('/', TenureController.createTenure);
router.get('/:tenureId', TenureController.getTenure);

module.exports = router;
