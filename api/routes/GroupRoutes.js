const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/GroupController');

router.post('/', GroupController.createGroup);
router.get('/', GroupController.getAllGroups);
router.get('/:userId', GroupController.getGroupsByUserId);
router.patch('/status/:groupId', GroupController.updateGroupStatus);
router.patch('/activation/:groupId', GroupController.activateGroup);

module.exports = router;
