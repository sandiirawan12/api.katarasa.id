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
// DATA ALL KERANJANG
exports.getCart = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const { limit, offset } = core.getPagination(Number(req.query.limit), Number(req.query.page));

        const options = {
            pagination: {
                limit: limit,
                offset: offset,
            },
            result: {
                where: {
                    customer_id: req.user.id
                },
            }
        }

        options.result.order = [['date_created', 'desc']]

        const [total, dataCartAll] = await Promise.all([
            models.tbl_customer_cart.findAll({ ...options.result }),
            models.tbl_customer_cart.findAll({ ...options.pagination, ...options.result })
        ])

        const mapping = dataCartAll.map((i) => {
            return {
                cart_id: i.id,
                customer_id: i.customer_id,
                customer: i.customer,
                product_id: i.product_id,
                product: i.product,
                image: i.image,
                price: i.url + i.price,
                qty: i.qty,
                total: i.total,
                is_checked: i.is_checked,
            }
        })

        output = {
            status: {
                code: 200,
                message: 'SUCCES GET DATA'
            },
            data: {
                totalData: total.length,
                totalPage: Math.ceil(total.length / req.query.limit),
                limit: Number(req.query.limit),
                currentPage: Number(req.query.page),
                canLoadMore: Math.ceil(total.length / req.query.limit) <= Number(req.query.page) ? false : true,
                data: mapping
            },
        }

        // const dataCartJaja = await core.axios.get(
        //     `${core.baseUrlJAJA}cart?page=${req.query.page}&limit=${req.query.limit}&is_gift=${req.query.is_gift}`,
        //     {
        //         headers: { 
        //             'Authorization': existUser.token_jaja, 
        //         }
        //     }
        // )

        // const resCartJaja = dataCartJaja.data.data

        // if (resCartJaja) {
        //     output = {
        //         status: {
        //             code: 200,
        //             message: 'Berhasil Get Data'
        //         },
        //         data: resCartJaja
        //     }

        // }

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
// TAMBAH KE KERANJANG
exports.addToCart = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        // const existUser = await models.tbl_customer.findOne({
        //     where: {
        //         id: req.user.id
        //     }
        // })

        // const tambahCartJaja = await core.axios.post(
        //     `${core.baseUrlJAJA}cart`,
        //     {
        //         productId: req.body.product_id,
        //         flashSaleId: "",
        //         lelangId: "",
        //         variantId: req.body.variant_id,
        //         qty: req.body.qty,
        //         dateSendTime: Date.now(),
        //         greetingCardGift: "",
        //         isNonPhysical: req.body.isNonPhysical
        //     },
        //     {
        //         headers: {
        //             'Authorization': existUser.token_jaja,
        //         }
        //     },
        // )

        // if (tambahCartJaja.data.status.code === 400) { 
        //     output = {
        //         status: {
        //             code: 400,
        //             message: 'Tambah cart jaja tidak berhasil'
        //         }
        //     }
        // } else {
        //     output = {
        //         status: {
        //             code: 200,
        //             message: "Berhasil menambahkan item produk ke keranjang"
        //         }
        //     }
        // }
        
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id
            }
        })

        const dataProduk = await models.tbl_product.findOne({
            where: {
                product_id : req.body.product_id,
            }
        })
        
        const tambahCart = await models.tbl_customer_cart.create({
            temp_id: "",
            customer_id: req.user.id,
            customer: existUser.name,
            sku: "",
            product_id : dataProduk.product_id,
            product: dataProduk.name,
            image: dataProduk.url + dataProduk.images,
            price: dataProduk.price,
            qty: req.body.qty,
            total: dataProduk.price * req.body.qty,
            is_checked: 0,
            date_created: Date.now()
        })

        if (tambahCart) {
            output = {
                status: {
                    code: 200,
                    message: 'Berhasil Tambah Ke Cart'
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

// DELETE DARI KERANJANG
exports.deleteFromCart = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        // const existUser = await models.tbl_customer.findOne({
        //     where: {
        //         id: req.user.id
        //     }
        // })

        // const deleteCartJaja = await core.axios.delete(
        //     `${core.baseUrlJAJA}cart/${req.query.cart_id}`,
        //     {
        //         headers: {
        //             'Authorization': existUser.token_jaja,
        //         }
        //     },
        // )

        // if (deleteCartJaja.data.status.code === 400) { 
        //     output = {
        //         status: {
        //             code: 400,
        //             message: 'Delete cart jaja tidak berhasil'
        //         }
        //     }
        // } else {
        //     output = {
        //         status: {
        //             code: 200,
        //             message: "Berhasil menghapus item produk pada keranjang"
        //         }
        //     }
        // }
        
        const deleteFromCart = await models.tbl_customer_cart.destroy({
            where: {
                id: req.query.cart_id
            }
        })

        if (deleteFromCart) {
            output = {
                status: {
                    code: 200,
                    message: "Berhasil menghapus item produk pada keranjang"
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



// PUT
// PILIH ITEM YANG INGIN DI CHECKOUT
exports.setSelectCart = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        // const existUser = await models.tbl_customer.findOne({
        //     where: {
        //         id: req.user.id
        //     }
        // })

        // const setSelectCartJaja = await core.axios.put(
        //     `${core.baseUrlJAJA}cart/selected?is_gift=0`,
        //     {
        //         cartId: req.body.cart_id,
        //         storeId: ""
        //     },
        //     {
        //         headers: {
        //             'Authorization': existUser.token_jaja,
        //         }
        //     },
        // )

        // if (setSelectCartJaja.data.status.code === 400) { 
        //     output = {
        //         status: {
        //             code: 400,
        //             message: 'Selected cart jaja tidak berhasil'
        //         }
        //     }
        // } else {
        //     output = {
        //         status: {
        //             code: 200,
        //             message: 'Selected cart berhasil di ubah'
        //         },
        //     }
        // }
        
        const dataSelectCart = await models.tbl_customer_cart.findOne(
            {
                where: {
                    id: req.query.cart_id
                }
            },
        )

        if (dataSelectCart.is_checked === 1) {
            const setSelectCart = await models.tbl_customer_cart.update(
                {
                    is_checked: 0
                },
                {
                    where: {
                        id: req.query.cart_id
                    }
                },
            )

            if (setSelectCart) {
                output = {
                    status: {
                        code: 200,
                        message: "Selected cart berhasil di ubah"
                    }
                }
            }
        } else {
            const setSelectCart = await models.tbl_customer_cart.update(
                {
                    is_checked: 1
                },
                {
                    where: {
                        id: req.query.cart_id
                    }
                },
            )

            if (setSelectCart) {
                output = {
                    status: {
                        code: 200,
                        message: "Selected cart berhasil di ubah"
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

// UPDATE QTY ITEM KERANJANG
exports.updateQtyCart = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        // const existUser = await models.tbl_customer.findOne({
        //     where: {
        //         id: req.user.id
        //     }
        // })

        // const updateQtyCartJaja = await core.axios.put(
        //     `${core.baseUrlJAJA}cart/qty?action=change`,
        //     {
        //         productId: req.body.product_id,
        //         variantId: req.body.variant_id,
        //         qty: req.body.qty
        //     },
        //     {
        //         headers: {
        //             'Authorization': existUser.token_jaja,
        //         }
        //     },
        // )

        // if (updateQtyCartJaja.data.status.code === 400) { 
        //     output = {
        //         status: {
        //             code: 400,
        //             message: 'Update qty cart jaja tidak berhasil'
        //         }
        //     }
        // } else {
        //     output = {
        //         status: {
        //             code: 200,
        //             message: 'Update qty cart produk berhasil'
        //         },
        //     }
        // }

        const dataCart = await models.tbl_customer_cart.findOne({
            where: {
                id: req.body.cart_id,
            }
        })
        
        const dataProduk = await models.tbl_product.findOne({
            where: {
                product_id : dataCart.product_id,
            }
        })
        
        const updateDataCart = await models.tbl_customer_cart.update(
            {
                product: dataProduk.name,
                image: dataProduk.url + dataProduk.images,
                price: dataProduk.price,
                qty: req.body.qty,
                total: dataProduk.price * req.body.qty
            },
            {
                where: {
                    id: req.body.cart_id
                }
            },
        )

        if (updateDataCart) {
            output = {
                status: {
                    code: 200,
                    message: "Selected cart berhasil di ubah"
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