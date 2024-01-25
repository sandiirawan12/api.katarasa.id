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
        case 'set-select-shipping': {
            return [
                check('store_id')
                    .not().isEmpty()
                    .withMessage(`ID store tidak boleh kosong`),
                check('address_id')
                    .not().isEmpty()
                    .withMessage(`ID alamat tidak boleh kosong`),
                check('shipping_code')
                    .not().isEmpty()
                    .withMessage(`Kode pengiriman tidak boleh kosong`),
                check('shipping_tipe')
                    .not().isEmpty()
                    .withMessage(`Tipe pengiriman tidak boleh kosong`),
                check('send_time')
                    .not().isEmpty()
                    .withMessage(`Waktu pengiriman tidak boleh kosong`),
            ]
        }
    }
}

// ================= DATA DI DIATAS SUDAH VALIDASI  ==============================
// ================== ========= ^^^ ^^^ =========   ==============================