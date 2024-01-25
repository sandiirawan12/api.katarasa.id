const core = require('../../config/core.config')
const models = core.models();
const CryptoJS = core.CryptoJS
const customErrorMiddleware = require('../../middleware/middleware.result');


exports.login = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const { email, } = req.body;

            const user = await models.tbl_customer.findOne({
                where: {
                    email: email
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
                        message: 'Login Berhasil'
                    },
                    data: {
                        token: token
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Login Gagal'
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

exports.register = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {

        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_customer.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!existUser) {
                let userId;
                const createUser = await models.tbl_customer.create({
                    name: req.body.name,
                    nip: "",
                    corporate: "",
                    department: "",
                    birth_date: "",
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    password: req.body.password,
                    hint: req.body.password,
                    gender_id: 1,
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
                            message: "Regristation Succes"
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