// MODEL DATABASE
const core = require('../../config/core.config')
const models = core.models()
// -----



// PLUGIN LAIN
const { check } = require('express-validator')
const db = require('../../config/db.config')
const CryptoJS = core.CryptoJS
// -----



// ================= DATA DI BAWAH SUDAH VALIDASI  ==============================
// ================== ========= Vvv vvV =========  ==============================

exports.validate = (method) => {
    switch (method) {
        case 'tambah-ke-cart': {
            return [
                check('product_id')
                    .not().isEmpty()
                    .withMessage(`ID produk tidak boleh kosong`),
                check('qty')
                    .not().isEmpty()
                    .withMessage(`Jumlah produk tidak boleh kosong`),
            ]
        }
            
        case 'delete-dari-cart': {
            return [
                check('cart_id')
                    .not().isEmpty()
                    .withMessage(`ID Keranjang tidak boleh kosong`),
            ]
        }
            
        case 'selectCart': {
            return [
                check('cart_id')
                    .not().isEmpty()
                    .withMessage(`ID Keranjang tidak boleh kosong`),
            ]
        }
            
        case 'update-qty-cart': {
            return [
                check('cart_id')
                    .not().isEmpty()
                    .withMessage(`Cart id tidak boleh kosong`),
                check('qty')
                    .not().isEmpty()
                    .withMessage(`Jumlah produk tidak boleh kosong`),
            ]
        }
    }
}

// ================= DATA DI DIATAS SUDAH VALIDASI  ==============================
// ================== ========= ^^^ ^^^ =========   ==============================