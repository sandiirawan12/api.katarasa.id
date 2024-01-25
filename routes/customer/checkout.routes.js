var express = require('express');
var router = express.Router();



// CONTROLLER
const checkoutController = require('../../controllers/customer/checkout.controller')
// ------



// MIDDLEWARE
const authentication = require('../../middleware/auth/private.middleware')
const checkoutMiddleware = require('../../middleware/customer/checkout.middleware')
// ------



// ================= DATA DI BAWAH SUDAH ROUTES API  ==============================
// ================== ========= Vvv vvV =========  ================================



// GET
// DATA CHECKOUT
router.get('/data-checkout', authentication, checkoutController.getDataCheckout);

// DATA SHIPPING
router.get('/data-shipping', authentication, checkoutController.getDataShipping);
// ====================



// PUT
// SET SELECT SHIPPING
router.put('/set-select-shipping', authentication, checkoutMiddleware.validate('set-select-shipping'), checkoutController.setSelectShipping);
// ====================



// POST
// ADD TO ORDER
router.post('/add-to-checkout', authentication, checkoutController.addToCheckout);
// ====================



// ================= DATA DI DIATAS SUDAH FUNGSI API  ==============================
// ================== ========= ^^^ ^^^ =========  =================================



module.exports = router;