var express = require('express');
var router = express.Router();



// CONTROLLER
const authNimdaController = require('../../controllers/nimda/auth.controller')
// ------



// MIDDLEWARE
const authentication = require('../../middleware/auth/private.middleware')
const authNimdaMiddleware = require('../../middleware/nimda/auth.middleware')
// ------



// ================= DATA DI BAWAH SUDAH ROUTES API  ==============================
// ================== ========= Vvv vvV =========  ================================



// GET
// DATA PROFILE NIMDA
router.get('/data-profile', authentication, authNimdaController.getProfileNimda)
// ====================



// POST
// LOGIN CUSTOMER
router.post('/login-nimda', authNimdaMiddleware.validate('login-nimda'), authNimdaController.loginNimda)

// REGISTER 
router.post('/register-nimda', authNimdaMiddleware.validate('register-nimda'), authentication, authNimdaController.registerNimda)

// LUPA PASSWORD CUSTOMER
router.post('/lupa-password-nimda', authNimdaMiddleware.validate('lupa-password-nimda'), authentication, authNimdaController.lupaPasswordNimda)
// ====================



// ================= DATA DI DIATAS SUDAH FUNGSI API  ==============================
// ================== ========= ^^^ ^^^ =========  =================================



module.exports = router;