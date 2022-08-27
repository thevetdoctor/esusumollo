const { Router } = require('express');

const router = Router();
const ContributionController = require('../controllers/ContributionController');
const checkAuth = require('../helpers/auth');

router.post('/', checkAuth, ContributionController.makeContribution);
router.get('/:contributionId', checkAuth, ContributionController.getContribution);

module.exports = router;
