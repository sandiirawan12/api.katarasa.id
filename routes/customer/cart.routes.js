var express = require('express');
var router = express.Router();



// CONTROLLER
const cartController = require('../../controllers/customer/cart.controller')
// ------



// MIDDLEWARE
const authentication = require('../../middleware/auth/private.middleware')
const cartMiddleware = require('../../middleware/customer/cart.middleware')
// ------



// ================= DATA DI BAWAH SUDAH ROUTES API  ==============================
// ================== ========= Vvv vvV =========  ================================



// POST
// TAMBAH KE KERANJANG
router.get('/data-cart', authentication, cartController.getCart);
// ====================



// POST
// TAMBAH KE KERANJANG
router.post('/tambah-ke-cart', authentication, cartMiddleware.validate('tambah-ke-cart'), cartController.addToCart);

// DELETE DARI KERANJANG
router.post('/delete-dari-cart', authentication, cartMiddleware.validate('delete-dari-cart'), cartController.deleteFromCart);
// ====================



// PUT
// PILIH ITEM YANG INGIN DI CHECKOUT
router.put('/set-select-cart', authentication, cartMiddleware.validate('selectCart'), cartController.setSelectCart);

// UPDATE QTY ITEM KERANJANG
router.put('/update-qty-cart', authentication, cartMiddleware.validate('update-qty-cart'), cartController.updateQtyCart);
// ============================



// ================= DATA DI DIATAS SUDAH FUNGSI API  ==============================
// ================== ========= ^^^ ^^^ =========  =================================



module.exports = router;