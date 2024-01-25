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
        case 'login': {
            return [
                check('email', 'Email tidak valid').not().isEmpty()
                    .withMessage(`Email tidak boleh kosong`)
                    .normalizeEmail()
                    .isEmail().withMessage('Format email salah'),
                check('password')
                    .not().isEmpty()
                    .withMessage(`Password tidak boleh kosong`).custom(async (pass, { req }) => {
                        const { email, password } = req.body

                        let query = await db.query(`SELECT * FROM tbl_customer WHERE LOWER(email) = '${email}'  AND password = MD5('${password}')`)

                        const validate = Boolean(query.length)

                        if (!validate) {
                            throw new SyntaxError('Email atau Password salah')
                        }
                    }),
            ]
        }

        case 'register': {
            return [
                check('name')
                    .not().isEmpty()
                    .withMessage(`Nama tidak boleh kosong`),
                check('email', 'Email Tidak Valid')
                    .normalizeEmail()
                    .isEmail()
                    .custom(async email => {
                        const value = await models.tbl_customer.findOne({
                            where: {
                                email: email,
                            }
                        })
                        if (value) {
                            throw new SyntaxError('Email Yang Anda Masukkan Telah Di Gunakan');
                        }
                    }),
                check('phone_number')
                    .not().isEmpty()
                    .withMessage(`No Telepon Tidak Boleh Kosong`),
                check('password')
                    .not().isEmpty()
                    .withMessage(`Password Tidak Boleh Kosong`),
                check('gender_id')
                    .not().isEmpty()
                    .withMessage(`Jenis Kelamin Tidak Boleh Kosong`),
            ]
        }
            
        case 'lupa-password': {
            return [
                check('email', 'Email tidak valid').not().isEmpty()
                    .withMessage(`Email tidak boleh kosong`)
                    .normalizeEmail()
                    .isEmail().withMessage('Format email salah'),
                check('passwordBaru')
                    .not().isEmpty()
                    .withMessage(`Password tidak boleh kosong`)
            ]
        }
    }
}

// ================= DATA DI DIATAS SUDAH VALIDASI  ==============================
// ================== ========= ^^^ ^^^ =========   ==============================