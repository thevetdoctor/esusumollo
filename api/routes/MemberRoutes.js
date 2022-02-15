const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/MemberController');

router.post('/', MemberController.addMember);
router.get('/:groupId', MemberController.getMembers);

module.exports = router;
