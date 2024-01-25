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
// DATA ORDER
exports.getDataOrder = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        })

        const dataOrderJaja = await core.axios.get(
            `${core.baseUrlJAJA}order?page=${req.query.page}&limit=${req.query.limit}&status=${req.query.status}`,
            {
                headers: { 
                    'Authorization': existUser.token_jaja, 
                }
            }
        )

        const resDataOrderJaja = dataOrderJaja.data.data

        if (dataOrderJaja.data.status.code === 400) {
            output = {
                status: {
                    code: 400,
                    message: 'Get Data order jaja tidak berhasil'
                }
            }
        } else {
             output = {
                status: {
                    code: 200,
                    message: 'Berhasil Get Data'
                },
                data: resDataOrderJaja
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

// DATA ORDER DETAIL
exports.getDataOrderDetail = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        })

        const dataOrderDetailJaja = await core.axios.get(
            `${core.baseUrlJAJA}order/${req.query.order_id}`,
            {
                headers: { 
                    'Authorization': existUser.token_jaja, 
                }
            }
        )

        const resDataOrderDetailJaja = dataOrderDetailJaja.data.data

        if (dataOrderDetailJaja.data.status.code === 400) {
            output = {
                status: {
                    code: 400,
                    message: 'Get Data order detail jaja tidak berhasil'
                }
            }
        } else {
             output = {
                status: {
                    code: 200,
                    message: 'Berhasil Get Data'
                },
                data: resDataOrderDetailJaja
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

// DATA ORDER CARD
exports.getDataOrderCard = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        })

        const dataOrderCardJaja = await core.axios.get(
            `${core.baseUrlJAJA}order/card/${req.query.order_id}`,
            {
                headers: { 
                    'Authorization': existUser.token_jaja, 
                }
            }
        )

        const resDataOrderCardJaja = dataOrderCardJaja.data.data

        output = {
            status: {
                code: 200,
                message: 'Berhasil Get Data'
            },
            data: resDataOrderCardJaja
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

// DATA KOMPLAIN ORDER
exports.getDataComplainOrder = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        })

        const dataComplainOrderJaja = await core.axios.get(
            `${core.baseUrlJAJA}order/komplainDetail?invoice=${req.query.invoice}`,
            {
                headers: { 
                    'Authorization': existUser.token_jaja, 
                }
            }
        )

        const resDataComplainOrderJaja = dataComplainOrderJaja.data.data

        if (dataComplainOrderJaja.data.status.code === 400) {
            output = {
                status: {
                    code: 400,
                    message: 'Data komplain tidak ditemukan'
                },
            }
        } else {
            output = {
                status: {
                    code: 200,
                    message: 'Berhasil Get Data'
                },
                data: resDataComplainOrderJaja
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

// DATA METHOD PAYMENT
exports.getDataMethodPayment = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const dataMethodPayment = await core.axios.get(
            `https://jsonx.jaja.id/front/api/common/methodPayment/1`,
        )

        const responseJson = JSON.stringify(dataMethodPayment.data);

        const responseJson2 = JSON.parse(responseJson);

        output = {
            status: {
                code: 200,
                message: 'Berhasil Get Data'
            },
            data: responseJson2
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
// PAYMENT
exports.postPayment = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        })

        const postPaymentJaja = await core.axios.get(
            `${core.baseUrlJAJA}payment/getPayment/${req.query.order_id}`,
            {
                headers: { 
                    'Authorization': existUser.token_jaja, 
                }
            }
        )

        const responseJson = JSON.stringify(postPaymentJaja.data);

        const responseJson2 = JSON.parse(responseJson);


        if (responseJson2.orderPaymentRecent === null) {
            output = {
                status: {
                    code: 400,
                    message: 'Pembayaran tidak berhasil'
                },
            }
        } else {
            output = {
                status: {
                    code: 200,
                    message: 'Pembayaran berhasil'
                },
                data: responseJson2
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

// PAYMENT SNAP TOKEN
exports.postPaymentSnapToken = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req);

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        });

        let data = JSON.stringify({
            "customer_details": {
                "email": req.body.email,
                "first_name": req.body.name,
                "last_name": "",
                "phone": null
            },
            "enabled_payments": [
                req.body.payment_sub
            ],
            "transaction_details": {
                "gross_amount": req.body.grand_total,
                "order_id": req.body.payment_id
            },
            "credit_card": ""
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${core.baseUrlJAJA}payment/getSnapToken/${req.query.order_id}?isFirstMethod=${req.query.isFirstMethod}`,
            headers: { 
                'Authorization': existUser.token_jaja,
            },
            data : data
        };
        
        const response = await core.axios.request(config);

        if (response.data.error_messages) {
            output = {
                status: {
                    code: 400,
                    message: 'Data pembayaran snaptoken gagal'
                },
                error_messages: response.data.error_messages
            };
        } else {
            const responseJson = JSON.stringify(response.data);
            const responseJson2 = JSON.parse(responseJson);

            output = {
                status: {
                    code: 200,
                    message: 'Data pembayaran snaptoken berhasil'
                },
                data: responseJson2
            };
        }
    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        };
    }

    if (!errorsFromMiddleware) {
        res.status(output.status.code).send(output);
    } else {
        res.status(errorsFromMiddleware.status.code).send(errorsFromMiddleware);
    }
}

// PAYMENT SNAP TOKEN UPDATE
exports.postPaymentSnapTokenUpdate = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req);

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        });

        let data = JSON.stringify({
            "dataPayment": {
                "payment_fee": req.body.payment_fee,
                "payment_form": req.body.payment_form,
                "payment_sub": req.body.payment_sub,
                "payment_sub_label": req.body.payment_sub_label,
                "payment_type": req.body.payment_type,
                "payment_type_label": req.body.payment_type_label
            },
            "fee": req.body.fee,
            "id_invoice": req.body.id_invoice,
            "order_code": req.body.order_code,
            "order_id": req.body.order_id,
            "token": req.body.token,
            "total_pembayaran": req.body.total_pembayaran
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${core.baseUrlJAJA}payment/snap_token_update`,
            headers: { 
                'Authorization': existUser.token_jaja,
            },
            data : data
        };
        
        const response = await core.axios.request(config);

        if (response.data.payment_id === null) {
            output = {
                status: {
                    code: 400,
                    message: 'Data pembayaran snaptoken update ada yang belum lengkap'
                },
            };
        } else {
            const responseJson = JSON.stringify(response.data);
            const responseJson2 = JSON.parse(responseJson);

            output = {
                status: {
                    code: 200,
                    message: 'Data pembayaran snaptoken update berhasil'
                },
                data: responseJson2
            };
        }
    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        };
    }

    if (!errorsFromMiddleware) {
        res.status(output.status.code).send(output);
    } else {
        res.status(errorsFromMiddleware.status.code).send(errorsFromMiddleware);
    }
}

// ====================



// ================= DATA DI DIATAS SUDAH FUNGSI API  ==============================
// ================== ========= ^^^ ^^^ =========  =================================