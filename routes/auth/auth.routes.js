var express = require('express');
var router = express.Router();

const authController = require('./../../controllers/auth/auth.controller')
const authMiddleware = require('../../middleware/auth.middleware')


router.post('/login', authMiddleware.validate('login'), authController.login);
router.post('/register', authMiddleware.validate('register'), authController.register);

module.exports = router;
