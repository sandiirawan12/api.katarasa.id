// MODELS DATABASE
const core = require('../../config/core.config')
const models = core.models()
// ------



// PLUGIN LAINNYA
const CryptoJS = core.CryptoJS

const { Op, Sequelize } = require('sequelize');
// ------



// MIDDLEWARE
const customErrorMiddleware = require('../../middleware/middleware.result');
// ------



// ================= DATA DI BAWAH SUDAH FUNGSI API  ==============================
// ================== ========= Vvv vvV =========  ================================



// GET
// DATA PROFILE NIMDA
exports.getProfileNimda = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })

            if (existUser) {
                const mapping = {
                    id: existUser.id,
                    name: existUser.name,
                    cabang: existUser.cabang,
                    email: existUser.email,
                }
                    
                output = {
                    status: {
                        code: 200,
                        message: "Sukses Get Data",
                    },
                    data: mapping
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses, dikarenakan belum login'
                    }
                }
            }
        }
    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }

    if (!errorsFromMiddleware) {
        res.status(output.status.code).send(output)
    } else {
        res.status(errorsFromMiddleware.status.code).send(errorsFromMiddleware)
    }
}
// ====================



// POST
// LOGIN NIMDA
exports.loginNimda = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const { email, } = req.body;

            const adminNimda = await models.tbl_admin.findOne({
                where: {
                    email: email,
                    status: 1
                }
            })
            if (adminNimda) {
                let payload = {
                    id: adminNimda.id,
                };

                const token = core.jwt.sign(payload, core.env.TOKEN_KEY, { expiresIn: "7d", });

                output = {
                    status: {
                        code: 200,
                        message: 'Login Nimda Berhasil'
                    },
                    data: {
                        token: token
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Login Nimda Gagal, Akun Dinonaktifkan'
                    },
                }
            }
        }
    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }

    if (!errorsFromMiddleware) {
        res.status(output.status.code).send(output)
    } else {
        res.status(errorsFromMiddleware.status.code).send(errorsFromMiddleware)
    }
}

// REGISTER CUSTOMER
exports.registerNimda = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!existUser) {
                let userId;
                const createNimda = await models.tbl_admin.create({
                    name: req.body.name,
                    cabang: "Baping",
                    email: req.body.email,
                    password: req.body.password,
                    hint: req.body.password,
                    status: 1,
                    date_login: Date.now(),
                    date_created: Date.now()
                })

                if (createNimda) {
                    userId = createNimda.dataValues.id.toString()
                    await models.tbl_admin.update(
                        {
                            password: CryptoJS.MD5(req.body.password).toString()
                        },
                        {
                            where: {
                                id: createNimda.id
                            }
                        }
                    )
                    output = {
                        status: {
                            code: 200,
                            message: "Pendaftaran akun nimda berhasil"
                        }
                    }
                }
            }
        }
    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }


    if (!errorsFromMiddleware) {
        res.status(output.status.code).send(output)
    } else {
        res.status(errorsFromMiddleware.status.code).send(errorsFromMiddleware)
    }

}

// LUPA PASSWORD CUSTOMER
exports.lupaPasswordNimda = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    
    try {

        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (existUser) {
                const updatePassword = await models.tbl_admin.update(
                    {
                        password: CryptoJS.MD5(req.body.passwordBaru).toString(),
                        hint: req.body.passwordBaru,
                    },
                    {
                        where: {
                            email: req.body.email 
                        }
                    }
                )

                if (updatePassword) {
                    output = {
                        status: {
                            code: 200,
                            message: "Berhasil mengubah password akun nimda"
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Pengguna tidak tersedia'
                    }
                }
            }
        }
    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }


    if (!errorsFromMiddleware) {
        res.status(output.status.code).send(output)
    } else {
        res.status(errorsFromMiddleware.status.code).send(errorsFromMiddleware)
    }

}
// ====================



// ================= DATA DI DIATAS SUDAH FUNGSI API  ==============================
// ================== ========= ^^^ ^^^ =========  ==================================