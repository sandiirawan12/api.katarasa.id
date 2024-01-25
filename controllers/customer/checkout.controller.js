// MODELS DATABASE
const core = require('../../config/core.config')
const models = core.models()
// ------



// PLUGIN LAINNYA
const CryptoJS = core.CryptoJS

const { Op, Sequelize } = require('sequelize');
const midtransClient = require('midtrans-client');
// ------



// MIDDLEWARE
const customErrorMiddleware = require('../../middleware/middleware.result');
// ------



// ================= DATA DI BAWAH SUDAH FUNGSI API  ==============================
// ================== ========= Vvv vvV =========  ================================



// GET
// DATA CHECKOUT
exports.getDataCheckout = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        // const existUser = await models.tbl_customer.findOne({
        //     where: {
        //         id: req.user.id,
        //     }
        // })

        // const dataCheckoutJaja = await core.axios.get(
        //     `${core.baseUrlJAJA}checkout?isCoin=0&fromCart=0&is_gift=0&is_non_physical=0`,
        //     {
        //         headers: { 
        //             'Authorization': existUser.token_jaja, 
        //         }
        //     }
        // )

        // const resDataCheckoutJaja = dataCheckoutJaja.data.data

        // if (dataCheckoutJaja.data.status.code === 400) {
        //     output = {
        //         status: {
        //             code: 400,
        //             message: 'Edit akun jaja tidak berhasil'
        //         }
        //     }
        // } else if (dataCheckoutJaja.data.status.code === 404) {
        //     output = {
        //         status: {
        //             code: 404,
        //             message: 'Belum ada cart yang di pilih'
        //         }
        //     }
        // } else {
        //      output = {
        //         status: {
        //             code: 200,
        //             message: 'Berhasil Get Data'
        //         },
        //         data: resDataCheckoutJaja
        //     }
        // }
        
        const dataCheckout = await models.tbl_customer_cart.findAll({
            where: {
                customer_id: req.user.id,
                is_checked: 1
            }
        })

        const cartSummary = await models.tbl_customer_cart.findAll({
            where: {
                customer_id: req.user.id,
                is_checked: 1
            }
        })

        const sumCount = await models.tbl_customer_cart.sum(
            'qty',
            {
                where: {
                    customer_id: req.user.id,
                    is_checked: 1
                }
            }
        );

        if (dataCheckout) {
            const mappingCart = dataCheckout.map((item) => {
                return {
                    cartId: item.id,
                    qtyCart: item.qty,
                    productId: item.product_id,
                    image: item.image,
                    name: item.product,
                    price: Number(item.price),
                    priceFormated: core.rupiah(item.price),
                    isChecked: item.is_checked == 1 ? true : false,
                }
            })

            const mappingCartSummary = cartSummary.map((item) => {
                return {
                    cartId: item.id,
                    qtyCart: item.qty,
                    productId: item.product_id,
                    image: item.image,
                    name: item.product,
                    price: Number(item.price * item.qty),
                    priceFormated: core.rupiah(item.price * item.qty),
                    isChecked: item.is_checked == 1 ? true : false,
                }
            })

            const res = [...mappingCart]
            const resSummary = [...mappingCartSummary]

            output = {
                status: {
                    code: 200,
                    message: 'SUCCESS GET DATA'
                },
                data: {
                    items: res,
                    summary: {
                        totalItems: sumCount,
                        subTotal: core.rupiah(core.sumArray(resSummary.map(i => i.price))),
                        subTotalNumber: core.sumArray(resSummary.map(i => i.price)),
                        discount: null,
                        total: core.rupiah(core.sumArray(resSummary.map(i => i.price))),
                        totalNumber: core.sumArray(resSummary.map(i => i.price)),
                        selectedCartId: resSummary.map(i => i.cartId).toString().split(',').map((k) => Number(k))
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

// DATA SHIPPING
exports.getDataShipping = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        })

        const dataShippingJaja = await core.axios.get(
            `${core.baseUrlJAJA}checkout/shipping?is_gift=0&is_multidrop=0`,
            {
                headers: { 
                    'Authorization': existUser.token_jaja, 
                }
            }
        )

        if (dataShippingJaja.data.status.code === 404) {
            output = {
                status: {
                    code: 404,
                    message: 'Belum ada cart yang di pilih'
                }
            }
        } else {
            output = {
                status: {
                    code: 200,
                    message: 'Berhasil Get Data'
                },
                data: dataShippingJaja.data.data[0]
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



// PUT
// SET SELECT SHIPPING
exports.setSelectShipping = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id
            }
        })

        const setSelectShipping = await core.axios.put(
            `${core.baseUrlJAJA}checkout/selectedShipping?is_gift=0&is_multidrop=0`,
            {
                storeId: req.body.store_id,
                addressId: req.body.address_id,
                shippingCode: req.body.shipping_code,
                shippingTypeCode: req.body.shipping_tipe,
                sendTime: req.body.send_time,
                dateSendTime: Date.now()
            },
            {
                headers: {
                    'Authorization': existUser.token_jaja,
                }
            },
        )

        if (setSelectShipping.data.status.code === 400) { 
            output = {
                status: {
                    code: 400,
                    message: 'Pemilihan pengiriman jaja tidak berhasil'
                }
            }
        } else if (setSelectShipping.data.status.code === 404) {
            output = {
                status: {
                    code: 404,
                    message: 'Belum ada cart yang di pilih'
                }
            }
        } else {
            output = {
                status: {
                    code: 200,
                    message: "Berhasil memilih pengiriman checkout"
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
// ADD TO ORDER
exports.addToCheckout = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id
            }
        })

        const dataAlamat = await models.tbl_customer_address.findOne({
            where: {
                id: req.body.address_id
            }
        })

        // const dataProduk = await models.tbl_product.findOne({
        //     where: {
        //         product_id : req.body.product_id,
        //     }
        // })

        const getCart = await core.axios.get(`${core.baseUrl}checkout/data-checkout`, {
            headers: {
                Authorization: req.headers.authorization
            }
        })

        const resCart = getCart.data.data

        if (resCart) {
            if (resCart.summary.subTotalNumber < 1) {
                output = {
                    status: {
                        code: 400,
                        message: 'Minimal total yang di checkout 1 rupiah'
                    }
                }
            } else {
                const setOrder = await models.tbl_customer_order.create({
                    invoice: `KATARASA-${core.moment(Date.now()).format('YYYY-MM-DD')}`,
                    antrian: 0,
                    customer_id: req.user.id,
                    customer: existUser.name,
                    address_id : dataAlamat.id,
                    address : dataAlamat.complete_address,
                    payment: req.body.payment,
                    payment_status: "",
                    payment_date: 0,
                    shipment: "",
                    expedisi: "",
                    ongkir: 0,
                    diskon: 0,
                    subtotal: resCart.summary.subTotalNumber,
                    total: resCart.summary.totalNumber,
                    status_order: 'New Order',
                    status_date: Date.now(),
                    date_created: Date.now(),
                })

                if (setOrder) {
                    // const setOrderHistory = await models.db_order_history.create({
                    //     order_id: setOrder.order_id,
                    //     order_status_id: setOrder.order_status_id,
                    //     notify: 1,
                    //     awb: 'static',
                    //     invoice_prefix: 'ELIBYU',
                    //     comment: 'New Order',
                    //     date_added: Date.now()
                    // })

                    const getOrder = await models.tbl_customer_order.findOne({
                        where: {
                            customer_id: req.user.id,
                            order_id: setOrder.order_id
                        }
                    })

                    const setOrderProduct = resCart.items.forEach(async i => {
                        await models.tbl_customer_order_detail.create({
                            order_id: setOrder.order_id,
                            product_id : i.productId,
                            product: i.name,
                            image: i.image,
                            qty: i.qtyCart,
                            berat: 0,
                            price: i.price,
                            total: i.price * i.qtyCart,
                            date_created: Date.now(),
                        })
                    });

                    if (getOrder) {
                        const deleteCart = await models.tbl_customer_cart.destroy({
                            where: {
                                customer_id: req.user.id,
                                is_checked: 1
                            },
                        })

                        if (deleteCart) {
                            output = {
                                status: {
                                    code: 200,
                                    message: 'Berhasil Checkout'
                                }
                            }
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
// ============================



// ================= DATA DI DIATAS SUDAH FUNGSI API  ==============================
// ================== ========= ^^^ ^^^ =========  =================================