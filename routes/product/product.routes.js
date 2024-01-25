var express = require('express');
var router = express.Router();
const productController = require('../../controllers/product/product.controller')

router.get('/get-product', productController.getProduct);
router.get('/add-category', productController.addCategory);
// router.get('/edit-product', productController.editProduct);

module.exports = router;
