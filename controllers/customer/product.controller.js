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
// DATA PRODUCT ALL
exports.getProduct = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        // const dataProdukJajaKatras = await core.axios.get(
        //     `${core.baseUrlJAJA}product/store/katarasa-coffe-tea?page=${req.query.page}&limit=${req.query.limit}&keyword=${req.query.keyword}&filter_price=${req.query.filter_price}&filter_category=${req.query.filter_category}&filter_condition=${req.query.filter_condition}&filter_preorder=${req.query.filter_preorder}&filter_brand=${req.query.filter_brand}&sort=${req.query.sort}&filter_etalase=${req.query.filter_etalase}`,
        // )

        // const resJaja = dataProdukJajaKatras.data.data.items

        const { limit, offset } = core.getPagination(Number(req.query.limit), Number(req.query.page));

        const options = {
            pagination: {
                limit: limit,
                offset: offset,
            },
            result: {
                where: {
                    status: 1,
                    name: {
                        [Op.like]: `%${req.query.keyword}%`
                    }
                },
            }
        }

        options.result.order = [['created_at', 'desc']]

        const [total, dataProduct] = await Promise.all([
            models.tbl_product.findAll({ ...options.result }),
            models.tbl_product.findAll({ ...options.pagination, ...options.result })
        ])

        const mapping = dataProduct.map((i) => {
            return {
                product_id: i.product_id,
                shop: i.shop,
                sku: i.sku,
                name: i.name,
                description: i.description,
                slug: i.slug,
                image: i.url + i.images,
                price: i.price,
                discount: i.discount
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

// DATA PRODUCT DETAIL BY ID
exports.getProductDetail = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const dataProductDetail = await models.tbl_product.findOne({
            where: {
                slug: req.query.slug,
                status: 1,
            }
        })

        const mapping = {
            product_id: dataProductDetail.product_id,
            shop: dataProductDetail.shop,
            sku: dataProductDetail.sku,
            name: dataProductDetail.name,
            description: dataProductDetail.description,
            image: dataProductDetail.url + dataProductDetail.images,
            price: dataProductDetail.price,
            discount: dataProductDetail.discount
        }

        output = {
            status: {
                code: 200,
                message: 'SUCCES GET DATA'
            },
            data: mapping
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



// DATA KATEGORI ALL
exports.getKategori = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const dataProdukJajaKatras = await core.axios.get(
            `${core.baseUrlJAJA}product/store/katarasa-coffe-tea?page=&limit=&keyword=&filter_price=&filter_category=&filter_condition=&filter_preorder=&filter_brand=&sort=&filter_etalase=`,
        )

        const resJajaKategori = dataProdukJajaKatras.data.data.filters[0].items

        output = {
            status: {
                code: 200,
                message: 'SUCCES GET DATA'
            },
            data: resJajaKategori
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
// ================== ========= ^^^ ^^^ =========  =================================