const express = require('express');
const router = express.Router();
const ContributionController = require('../controllers/ContributionController');

router.post('/', ContributionController.makeContribution);
router.get('/:contributionId', ContributionController.getContribution);

module.exports = router;
