const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

router.post('/signup',controller.signupUser)
router.post('/login',controller.loginUser)

module.exports = router;