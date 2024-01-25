var express = require('express');
var router = express.Router();



// CONTROLLER
const authController = require('../../controllers/customer/auth.controller')
// ------



// MIDDLEWARE
const authentication = require('../../middleware/auth/private.middleware')
const authMiddleware = require('../../middleware/customer/auth.middleware')
// ------



// ================= DATA DI BAWAH SUDAH ROUTES API  ==============================
// ================== ========= Vvv vvV =========  ================================



// POST
// LOGIN CUSTOMER
router.post('/login', authMiddleware.validate('login'), authController.login)

// REGISTER 
router.post('/register', authMiddleware.validate('register'), authController.register)

// LUPA PASSWORD CUSTOMER
router.post('/lupa-password', authMiddleware.validate('lupa-password'), authController.lupaPassword)
// ====================



// ================= DATA DI DIATAS SUDAH FUNGSI API  ==============================
// ================== ========= ^^^ ^^^ =========  =================================



module.exports = router;