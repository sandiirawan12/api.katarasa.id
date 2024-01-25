var express = require('express');
var router = express.Router();



// CONTROLLER
const productController = require('../../controllers/customer/product.controller')
// ------



// MIDDLEWARE
const productMiddleware = require('../../middleware/customer/product.middleware')
// ------



// ================= DATA DI BAWAH SUDAH ROUTES API  ==============================
// ================== ========= Vvv vvV =========  ================================



// GET
// DATA PRODUCT ALL
router.get('/get-product', productMiddleware.validate('get-product'), productController.getProduct);

// DATA PRODUCT DETAIL BY ID
router.get('/get-product-detail', productMiddleware.validate('get-product-detail'), productController.getProductDetail);



// DATA KATEGORI ALL
router.get('/get-kategori', productController.getKategori);
// ====================



// ================= DATA DI DIATAS SUDAH FUNGSI API  ==============================
// ================== ========= ^^^ ^^^ =========  =================================



module.exports = router;