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
// DATA USER CUSTOMER
exports.getUser = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const userAll = await models.tbl_customer.findAll(
                {
                    where: {
                        status: 1
                    },
                    order: [['id', 'DESC']]
                }
            )
            if (userAll) {
                const mapping = userAll.map((i) => {
                    return {
                        id: i.id,
                        name: i.name,
                        nip: i.nip,
                        corporate: i.corporate,
                        department: i.department,
                        birth_date: core.dateFormatStandar(i.birth_date),
                        phone_number: i.phone_number,
                        email: i.email,
                        gender_id: i.gender_id,
                        gender: i.gender_id === 1 ? 'Laki-laki' : 'Perempuan',
                    }
                })
                output = {
                    status: {
                        code: 200,
                        message: 'Get Data Berhasil'
                    },
                    data: mapping
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

// DATA USER CUSTOMER BY ID
exports.getUserByID = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const userByID = await models.tbl_customer.findOne(
                {
                    where: {
                        id: req.query.id,
                        status: 1
                    }
                }
            )

            const addressUser = await models.tbl_customer_address.findAll(
                {
                    where: {
                        customer_id: userByID.id,
                    }
                }
            )

            if (userByID) {
                const mapping =  {
                    id: userByID.id,
                    name: userByID.name,
                    nip: userByID.nip,
                    corporate: userByID.corporate,
                    department: userByID.department,
                    birth_date: core.dateFormatStandar(userByID.birth_date),
                    phone_number: userByID.phone_number,
                    email: userByID.email,
                    gender_id: userByID.gender_id,
                    gender: userByID.gender_id === 1 ? 'Laki-laki' : 'Perempuan',
                }

                const mappingAddress = addressUser.map((i) => {
                    return {
                        id: i.id,
                        address_as: i.address_as,
                        receiver_name: i.receiver_name,
                        phone_number: i.phone_number,
                        province: i.province,
                        city: i.city,
                        district: i.district,
                        sub_district: i.sub_district,
                        postal_code: i.postal_code,
                        complete_address: i.complete_address,
                    }
                }) 

                output = {
                    status: {
                        code: 200,
                        message: 'Get Data Berhasil'
                    },
                    dataDetail: mapping,
                    alamatUser: mappingAddress
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Data detail customer tidak ada'
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