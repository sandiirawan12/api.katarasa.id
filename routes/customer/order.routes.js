var express = require('express');
var router = express.Router();



// CONTROLLER
const orderController = require('../../controllers/customer/order.controller')
// ------



// MIDDLEWARE
const authentication = require('../../middleware/auth/private.middleware')
const orderMiddleware = require('../../middleware/customer/order.middleware')
// ------



// ================= DATA DI BAWAH SUDAH ROUTES API  ==============================
// ================== ========= Vvv vvV =========  ================================



// GET
// DATA ORDER
router.get('/data-order', authentication, orderMiddleware.validate('data-order'), orderController.getDataOrder);

// DATA ORDER DETAIL
router.get('/data-order-detail', authentication, orderMiddleware.validate('data-order-detail'), orderController.getDataOrderDetail);

// DATA ORDER CARD
router.get('/data-order-card', authentication, orderMiddleware.validate('data-order-card'), orderController.getDataOrderCard);

// DATA KOMPLAIN ORDER
router.get('/data-complain-order', authentication, orderMiddleware.validate('data-complain-order'), orderController.getDataComplainOrder);

// DATA METHOD PAYMENT
router.get('/data-method-payment', authentication, orderController.getDataMethodPayment);
// ====================



// POST
// PAYMENT
router.post('/payment', authentication, orderMiddleware.validate('post-payment'), orderController.postPayment);

// PAYMENT SNAP TOKEN
router.post('/payment-snaptoken', authentication, orderMiddleware.validate('post-payment-snaptoken'), orderController.postPaymentSnapToken);

// PAYMENT SNAP TOKEN UPDATE
router.post('/payment-snaptoken-update', authentication, orderMiddleware.validate('post-payment-snaptoken-update'),  orderController.postPaymentSnapTokenUpdate);
// ====================



// ================= DATA DI DIATAS SUDAH FUNGSI API  ==============================
// ================== ========= ^^^ ^^^ =========  =================================



module.exports = router;