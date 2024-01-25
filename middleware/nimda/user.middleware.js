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
        case 'data-user-by': {
            return [
                check('id')
                    .not().isEmpty()
                    .withMessage(`ID Customer tidak boleh kosong`)
            ]
        }
    }
}

// ================= DATA DI DIATAS SUDAH VALIDASI  ==============================
// ================== ========= ^^^ ^^^ =========   ==============================