const { Router } = require('express');

const router = Router();
const AuthController = require('../controllers/AuthController');

router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.logIn);

module.exports = router;
