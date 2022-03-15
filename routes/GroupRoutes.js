const express = require('express');

const router = express.Router();
const GroupController = require('../controllers/GroupController');
const checkAuth = require('../helpers/auth');

router.post('/', checkAuth, GroupController.createGroup);
router.get('/', checkAuth, GroupController.getAllGroups);
router.get('/:userId', checkAuth, GroupController.getGroupsByUserId);
router.patch('/status/:groupId', checkAuth, GroupController.updateGroupStatus);
router.patch('/activation/:groupId', checkAuth, GroupController.activateGroup);

module.exports = router;
