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



// POST
// LOGIN CUSTOMER
exports.login = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const { email, } = req.body;

            // const cekLoginJaja = await core.axios.post(
            //     `${core.baseUrlJAJA}user/login`,
            //     {
            //         email: req.body.email,
            //         password: req.body.password
            //     }
            // )

            // if (cekLoginJaja.data.status.code === 400) {
            //     output = {
            //         status: {
            //             code: 400,
            //             message: 'Login akun jaja tidak berhasil'
            //         }
            //     }
            // } else {
            //     const updateToken = await models.tbl_customer.update(
            //         {
            //             token_jaja: cekLoginJaja.data.data
            //         },
            //         {
            //             where: {
            //                 email: email,
            //                 status: 1
            //             }
            //         }
            //     )

            //     const user = await models.tbl_customer.findOne({
            //         where: {
            //             email: email,
            //             status: 1
            //         }
            //     })
            //     if (user && updateToken) {
            //         let payload = {
            //             id: user.id,
            //         };
            //         const token = core.jwt.sign(payload, core.env.TOKEN_KEY, { expiresIn: "7d", });

            //         output = {
            //             status: {
            //                 code: 200,
            //                 message: 'Login Customer Berhasil'
            //             },
            //             data: {
            //                 token: token
            //             }
            //         }
            //     } else {
            //         output = {
            //             status: {
            //                 code: 400,
            //                 message: 'Login Customer Gagal, Akun Dinonaktifkan'
            //             },
            //         }
            //     }
            // }

            const user = await models.tbl_customer.findOne({
                where: {
                    email: email,
                    status: 1
                }
            })
            if (user) {
                let payload = {
                    id: user.id,
                };
                const token = core.jwt.sign(payload, core.env.TOKEN_KEY, { expiresIn: "7d", });

                output = {
                    status: {
                        code: 200,
                        message: 'Login Customer Berhasil'
                    },
                    data: {
                        token: token
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Login Customer Gagal, Akun Dinonaktifkan'
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
exports.register = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            // const createRegisterJaja = await core.axios.post(
            //     `${core.baseUrlJAJA}user/register`,
            //     {
            //         email: req.body.email,
            //         password: req.body.password,
            //         fullName: req.body.name,
            //         phoneNumber: req.body.phone_number
            //     }
            // )
            
            // if (createRegisterJaja.data.status.code === 400) {
            //     output = {
            //         status: {
            //             code: 400,
            //             message: 'Register akun jaja tidak berhasil'
            //         }
            //     }
            // } else {
            //     const cekDataCustomerKatras = await models.tbl_customer.findOne({
            //         where: {
            //             email: req.body.email
            //         }
            //     })
            //     if (!cekDataCustomerKatras) {
            //         let userId;
            //         const createUser = await models.tbl_customer.create({
            //             name: req.body.name,
            //             nip: "",
            //             corporate: "",
            //             department: "",
            //             birth_date: "",
            //             phone_number: req.body.phone_number,
            //             email: req.body.email,
            //             password: req.body.password,
            //             hint: req.body.password,
            //             gender_id: req.body.gender_id,
            //             status: 1,
            //             date_register: Date.now(),
            //             date_created: Date.now()
            //         })

            //         if (createUser) {
            //             userId = createUser.dataValues.id.toString()
            //             await models.tbl_customer.update(
            //                 {
            //                     password: CryptoJS.MD5(req.body.password).toString()
            //                 },
            //                 {
            //                     where: {
            //                         id: createUser.id
            //                     }
            //                 }
            //             )
            //             output = {
            //                 status: {
            //                     code: 200,
            //                     message: "Pendaftaran akun customer berhasil"
            //                 }
            //             }
            //         }
            //     } else {
            //         output = {
            //             status: {
            //                 code: 400,
            //                 message: 'Email yang anda masukkan sudah digunakan'
            //             }
            //         }
            //     }
            // }

            const cekDataCustomerKatras = await models.tbl_customer.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!cekDataCustomerKatras) {
                let userId;
                const createUser = await models.tbl_customer.create({
                    name: req.body.name,
                    nip: "",
                    corporate: "",
                    department: "",
                    birth_date: 0,
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    password: req.body.password,
                    hint: req.body.password,
                    gender_id: req.body.gender_id,
                    status: 1,
                    date_register: Date.now(),
                    date_created: Date.now()
                })

                if (createUser) {
                    userId = createUser.dataValues.id.toString()
                    await models.tbl_customer.update(
                        {
                            password: CryptoJS.MD5(req.body.password).toString()
                        },
                        {
                            where: {
                                id: createUser.id
                            }
                        }
                    )
                    output = {
                        status: {
                            code: 200,
                            message: "Pendaftaran akun customer berhasil"
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Email yang anda masukkan sudah digunakan'
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
exports.lupaPassword = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_customer.findOne({
                where: {
                    email: req.body.email
                }
            })
            
            // const lupaPasswordJaja = await core.axios.put(
            //     `${core.baseUrlJAJA}user/change_password/new`,
            //     {
            //         email: req.body.email,
            //         old_password: existUser.hint,
            //         new_password: req.body.passwordBaru,
            //         confirm_new_password: req.body.passwordBaru,
            //     }
            // )
            
            // if (lupaPasswordJaja.data.status.code === 400) {
            //     output = {
            //         status: {
            //             code: 400,
            //             message: 'Lupa passsword akun jaja tidak berhasil'
            //         }
            //     }
            // } else {
            //     const updatePassword = await models.tbl_customer.update(
            //         {
            //             password: CryptoJS.MD5(req.body.passwordBaru).toString(),
            //             hint: req.body.passwordBaru,
            //         },
            //         {
            //             where: {
            //                 email: req.body.email 
            //             }
            //         }
            //     )

            //     if (updatePassword) {
            //         output = {
            //             status: {
            //                 code: 200,
            //                 message: "Berhasil mengubah password customer"
            //             }
            //         }
            //     }
            // }
            const updatePassword = await models.tbl_customer.update(
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
                        message: "Berhasil mengubah password customer"
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