const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/MemberController');
const checkAuth = require('../helpers/auth');

router.post('/', checkAuth, MemberController.addMember);
router.get('/:groupId', checkAuth, MemberController.getMembers);
router.post('/generateId', checkAuth, MemberController.generateUniqueIDToAddMember);
router.get('/join/:uniqueId', checkAuth, MemberController.addMemberByUniqueId);

module.exports = router;
