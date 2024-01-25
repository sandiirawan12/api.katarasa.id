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
        case 'get-product': {
            return [
                check('page')
                    .not().isEmpty()
                    .withMessage(`Page produk tidak boleh kosong`),
                check('limit')
                    .not().isEmpty()
                    .withMessage(`Limit produk tidak boleh kosong`),
            ]
        }
        case 'get-product-detail': {
            return [
                check('slug')
                    .not().isEmpty()
                    .withMessage(`Slug produk tidak boleh kosong`),
            ]
        }
    }
}

// ================= DATA DI DIATAS SUDAH VALIDASI  ==============================
// ================== ========= ^^^ ^^^ =========   ==============================