var express = require('express');
var router = express.Router();



// CONTROLLER
const userNimdaController = require('../../controllers/nimda/user.controller')
// ------



// MIDDLEWARE
const authentication = require('../../middleware/auth/private.middleware')
const userNimdaMiddleware = require('../../middleware/nimda/user.middleware')
// ------



// ================= DATA DI BAWAH SUDAH ROUTES API  ==============================
// ================== ========= Vvv vvV =========  ================================



// GET
// DATA USER CUSTOMER
router.get('/data-user', authentication, userNimdaController.getUser)

// DATA USER CUSTOMER BY ID
router.get('/data-user-by', userNimdaMiddleware.validate('data-user-by'), authentication, userNimdaController.getUserByID)
// ====================



// ================= DATA DI DIATAS SUDAH FUNGSI API  ==============================
// ================== ========= ^^^ ^^^ =========  =================================



module.exports = router;