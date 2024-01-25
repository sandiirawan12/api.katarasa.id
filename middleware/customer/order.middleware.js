// MODEL DATABASE
const core = require('../../config/core.config')
const models = core.models()
// -----



// PLUGIN LAIN
const { check } = require('express-validator')
const db = require('../../config/db.config')
const CryptoJS = core.CryptoJS
const bodyParser = require('body-parser');
// -----



// ================= DATA DI BAWAH SUDAH VALIDASI  ==============================
// ================== ========= Vvv vvV =========  ==============================

exports.validate = (method) => {
    switch (method) {
        case 'data-order': {
            return [
                check('page')
                    .not().isEmpty()
                    .withMessage(`Halaman data tidak boleh kosong`),
                check('limit')
                    .not().isEmpty()
                    .withMessage(`Limit data tidak boleh kosong`),
            ]
        }
            
        case 'data-order-detail': {
            return [
                check('order_id')
                    .not().isEmpty()
                    .withMessage(`ID order tidak boleh kosong`),
            ]
        }
            
        case 'data-order-card': {
            return [
                check('order_id')
                    .not().isEmpty()
                    .withMessage(`ID order tidak boleh kosong`),
            ]
        }
            
        case 'data-complain-order': {
            return [
                check('invoice')
                    .not().isEmpty()
                    .withMessage(`No Invoice tidak boleh kosong`),
            ]
        }
            
        case 'post-payment': {
            return [
                check('order_id')
                    .not().isEmpty()
                    .withMessage(`ID order tidak boleh kosong`),
            ]
        }
            
        case 'post-payment-snaptoken': {
            return [
                check('order_id')
                    .not().isEmpty()
                    .withMessage(`ID order tidak boleh kosong`),
                check('isFirstMethod')
                    .not().isEmpty()
                    .withMessage(`Tipe metode tidak boleh kosong`),
                check('email')
                    .not().isEmpty()
                    .withMessage(`Email tidak boleh kosong`),
                check('name')
                    .not().isEmpty()
                    .withMessage(`Nama lengkap tidak boleh kosong`),
                check('payment_sub')
                    .not().isEmpty()
                    .withMessage(`Sub Pembayaran tidak boleh kosong`),
                check('grand_total')
                    .not().isEmpty()
                    .withMessage(`Total pembayaran tidak boleh kosong`),
                check('payment_id')
                    .not().isEmpty()
                    .withMessage(`ID payment tidak boleh kosong`),
            ]
        }
            
        case 'post-payment-snaptoken-update': {
            return [
                check('payment_fee')
                    .not().isEmpty()
                    .withMessage(`Fee pembayaran bank tidak boleh kosong`),
                check('payment_form')
                    .not().isEmpty()
                    .withMessage(`Pembayaran dari tidak boleh kosong`),
                check('payment_sub')
                    .not().isEmpty()
                    .withMessage(`Sub pembayaran bank boleh kosong`),
                check('payment_sub_label')
                    .not().isEmpty()
                    .withMessage(`Nama Bank tidak boleh kosong`),
                check('payment_type')
                    .not().isEmpty()
                    .withMessage(`Tipe pembayaran tidak boleh kosong`),
                check('payment_type_label')
                    .not().isEmpty()
                    .withMessage(`Nama tipe pembayaran tidak boleh kosong`),
                check('fee')
                    .not().isEmpty()
                    .withMessage(`Fee pembayaran tidak boleh kosong`),
                check('order_id')
                    .not().isEmpty()
                    .withMessage(`ID order pembayaran tidak boleh kosong`),
                check('token')
                    .not().isEmpty()
                    .withMessage(`Token pembayaran tidak boleh kosong`),
                check('total_pembayaran')
                    .not().isEmpty()
                    .withMessage(`Total pembayaran tidak boleh kosong`),
            ]
        }
    }
}

// ================= DATA DI DIATAS SUDAH VALIDASI  ==============================
// ================== ========= ^^^ ^^^ =========   ==============================