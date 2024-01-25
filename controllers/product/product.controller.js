const core = require('../../config/core.config')
const models = core.models();
const customErrorMiddleware = require('../../middleware/middleware.result');

exports.getProduct = async (req, res) => {


    try {

        //deklarasiin join
        // models.product.belongsTo(models.category, {
        //     foreignKey:'category_id'
        // })
        models.tbl_categories.hasMany(models.tbl_product, { foreignKey: { name: 'categories_id' } });

        const productGet = await models.tbl_categories.findAll({
            //implementasiin join
            include: [
                {
                    model: models.tbl_product,

                }
            ]

        })

        if (productGet) {
            const result = productGet.map((i) => {
                const mapping = {
                    productCategory: i.name,
                    productDetail: i.tbl_products.map((x) => {
                        return {
                            productName: x.name,
                            productPrice: x.price,
                            productDescription: x.description,
                            productImage: x.url
                        }
                    })
                }

                return mapping

            })
            console.log("🚀 ~ file: product.controller.js:44 ~ result ~ result", result)

            output = {
                status: {
                    code: 200,
                    message: 'Success Get Data'
                },
                data: result
                // data: productGet.map((i) => {
                //     return {
                //         productName: i.product_name,
                //         categoryName: i.category.category_name
                //     }
                // })
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

    const errorsFromMiddleware = await customErrorMiddleware(req)

    if (!errorsFromMiddleware) {
        res.status(output.status.code).send(output)
    } else {
        res.status(errorsFromMiddleware.status.code).send(errorsFromMiddleware)
    }
}

exports.addCategory = async (req, res) => {
    try {
        const createCategory = await models.category.create({
            category_name: req.body.categoryName,
            category_code: req.body.categoryCode,
            status: req.body.status,
            created_at: Date.now(),
            updated_at: Date.now(),
        })

        if (createCategory) {
            output = {
                status: {
                    code: 200,
                    message: 'Success Create Data'
                },
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

    res.status(output.status.code).send(output)
}

exports.editProduct = async (req, res) => {

}

exports.deleteProduct = async (req, res) => {

}