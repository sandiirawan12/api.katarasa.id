// MODELS DATABASE
const core = require('../../config/core.config')
const models = core.models()
// ------



// PLUGIN LAINNYA
const CryptoJS = core.CryptoJS

const { Op, Sequelize } = require('sequelize');

const sequelize = require('sequelize')

const fs = require('fs');
// ------



// MIDDLEWARE
const customErrorMiddleware = require('../../middleware/middleware.result');
// ------



// ================= DATA DI BAWAH SUDAH FUNGSI API  ==============================
// ================== ========= Vvv vvV =========  ================================



// GET
// DATA DASHBOARD
exports.getDashboard = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const dataCustomer = await models.tbl_customer.findAll()


            const dataKategoriJajaKatras = await core.axios.get(
                `https://jaja.id/backend/product/store/katarasa-coffe-tea?page=&limit=&keyword=&filter_price=&filter_category=&filter_condition=&filter_preorder=&filter_brand=&sort=&filter_etalase=`,
            )
            const resJajaKategori = dataKategoriJajaKatras.data.data.filters[0].items


            const dataProdukJajaKatras = await core.axios.get(
                `https://jaja.id/backend/product/store/katarasa-coffe-tea?page=1&limit=100&keyword=&filter_price=&filter_category=&filter_condition=&filter_preorder=&filter_brand=&sort=&filter_etalase=`,
            )
            const resJaja = dataProdukJajaKatras.data.data.items
            

            const dataAlamatKatras = await models.tbl_address_katarasa.findAll(
                {
                    order: [['id', 'DESC']]
                }
            )

            // ==========
            const mapping = {
                jumlah_user: dataCustomer.length,
                jumlah_kategori: resJajaKategori.length,
                jumlah_produk: resJaja.length
            }

            const mappingSellerJaja = {
                email: "katarasacoffe@gmail.com",
                password: "kopikatarasa"
            }

            // ==========
            const alamat_katarasa = dataAlamatKatras.map((i) => {
                return {
                    title_address: i.title_address,
                    address: i.address,
                    pic: i.pic,
                    phone_number: i.phone_number
                }
            }) 

            // ==========
            let startDate = core.moment(Date.now()).subtract(30, 'days').format('YYYY-MM-DD')
            let endDate = core.moment(Date.now()).format('YYYY-MM-DD')

            const options = {
                result: {
                    attributes: [
                        ['date_register', 'date'],
                        [sequelize.fn('COUNT', 'date_register'), 'length']
                    ],
                    group: ['date_register'],
                    where: {
                        ...(startDate && endDate) ? {
                            date_register: {
                                [Op.between]: [startDate, endDate]
                            }
                        } : {},
                    },
                },
            }

            options.result.order = [
                ['date_register', 'DESC']
            ]

            const [getReport] = await Promise.all([
                models.tbl_customer.findAll({
                    ...options.result
                })
            ])

            const mappingChart = getReport.map((item) => {
                return {
                    label: core.moment(item.dataValues.date).locale("id").format('DD MMMM YYYY'),
                    values: item.dataValues.length
                }
            })
            
            if (mapping) {
               output = {
                    status: {
                        code: 200,
                        message: 'Berhasil Get Data'
                    },
                    data: mapping,
                    alamatKatarasa: alamat_katarasa,
                    loginSellerJaja: mappingSellerJaja,
                    chartUser: mappingChart
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



// DATA BANNER
exports.getBanner = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const dataBanner = await models.tbl_images.findAll({
                where: {
                    type: 'banner',
                },
                order: [['id', 'DESC']]
            })
            
            if (dataBanner) {
                output = {
                    status: {
                        code: 200,
                        message: "Sukses Get Data"
                    },
                    data: dataBanner
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

// DATA BANNER
exports.getBannerDetail = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })
            if (existUser) {
                const dataBanner = await models.tbl_images.findOne({
                    where: {
                        id: req.query.id,
                        type: 'banner',
                    }
                })
                
                if (dataBanner) {
                    output = {
                        status: {
                            code: 200,
                            message: "Sukses Get Data"
                        },
                        data: dataBanner
                    }
                } else {
                    output = {
                        status: {
                            code: 400,
                            message: 'Data banner tidak tersedia'
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses dikarenakan belum login'
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



// DATA ALAMAT KATARASA
exports.getAlamatKatarasa = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        models.tbl_address_katarasa.belongsTo(models.ro_province, {
            foreignKey: 'province_id',
            targetKey: 'province_id'
        });

        models.tbl_address_katarasa.belongsTo(models.ro_city, {
            foreignKey: 'city_id',
            targetKey: 'city_id'
        });

        models.tbl_address_katarasa.belongsTo(models.ro_district, {
            foreignKey: 'district_id',
            targetKey: 'district_id'
        });
        
        models.tbl_address_katarasa.belongsTo(models.ro_sub_district, {
            foreignKey: 'sub_district_id',
            targetKey: 'sub_district_id'
        });
        
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })
            if (existUser) {
                const dataAlamat = await models.tbl_address_katarasa.findAll(
                    {
                        include: [
                            {
                                model: models.ro_province,
                            },
                            {
                                model: models.ro_city,
                            },
                            {
                                model: models.ro_district,
                            },
                            {
                                model: models.ro_sub_district,
                            }
                        ],
                        order: [['id', 'DESC']]
                    },
                )

                const mapping = dataAlamat.map((i) => {
                    return {
                        id: i.id,
                        title_address: i.title_address,
                        address: i.address,
                        pic: i.pic,
                        phone_number: i.phone_number,
                        province: i.ro_province?.province ? i.ro_province.province : '',
                        city: i.ro_city?.city ? i.ro_city.city : '',
                        district: i.ro_district?.district ? i.ro_district.district : '',
                        district_kd: i.ro_district?.district_kd ? i.ro_district.district_kd : '',
                        sub_district: i.ro_sub_district?.sub_district ? i.ro_sub_district.sub_district : '',
                        postal_code: i.postal_code
                    }
                })
                
                if (dataAlamat) {
                    output = {
                        status: {
                            code: 200,
                            message: "Sukses Get Data"
                        },
                        data: mapping
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses dikarenakan belum login'
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

// DATA ALAMAT KATARASA BY ID
exports.getAlamatKatarasaByID = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        models.tbl_address_katarasa.belongsTo(models.ro_province, {
            foreignKey: 'province_id',
            targetKey: 'province_id'
        });

        models.tbl_address_katarasa.belongsTo(models.ro_city, {
            foreignKey: 'city_id',
            targetKey: 'city_id'
        });

        models.tbl_address_katarasa.belongsTo(models.ro_district, {
            foreignKey: 'district_id',
            targetKey: 'district_id'
        });
        
        models.tbl_address_katarasa.belongsTo(models.ro_sub_district, {
            foreignKey: 'sub_district_id',
            targetKey: 'sub_district_id'
        });
        
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })
            if (existUser) {
                const dataAlamatByID = await models.tbl_address_katarasa.findOne(
                    {
                        where: {
                            id: req.query.id
                        },
                        include: [
                            {
                                model: models.ro_province,
                            },
                            {
                                model: models.ro_city,
                            },
                            {
                                model: models.ro_district,
                            },
                            {
                                model: models.ro_sub_district,
                            }
                        ],
                    },
                )

                const mapping = {
                    id: dataAlamatByID.id,
                    title_address: dataAlamatByID.title_address,
                    address: dataAlamatByID.address,
                    pic: dataAlamatByID.pic,
                    phone_number: dataAlamatByID.phone_number,
                    province_id: dataAlamatByID?.province_id,
                    province: dataAlamatByID?.ro_province?.province,
                    city_id: dataAlamatByID?.city_id,
                    city: dataAlamatByID?.ro_city?.city,
                    district_id: dataAlamatByID?.district_id,
                    district_kd: dataAlamatByID?.ro_district?.district_kd,
                    district: dataAlamatByID?.ro_district?.district,
                    sub_district_id: dataAlamatByID.city_id,
                    sub_district: dataAlamatByID?.ro_sub_district?.sub_district,
                    postal_code: dataAlamatByID.postal_code
                }
                
                if (dataAlamatByID) {
                    output = {
                        status: {
                            code: 200,
                            message: "Sukses Get Data"
                        },
                        data: mapping
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses dikarenakan belum login'
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



// DATA ARTIKEL
exports.getArtikel = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const dataArtikel = await models.tbl_artikel.findAll(
                {
                    order: [['id', 'DESC']]
                }
            )

            const mapping = dataArtikel.map((i) => {
                return {
                    id: i.id,
                    link_image: '/assets/images/artikel/' + i.image,
                    image: i.image,
                    judul_artikel: i.judul_artikel,
                    isi_artikel: i.isi_artikel,
                    penulis_artikel: i.penulis_artikel,
                    penerbit: i.penerbit,
                    tanggal_terbit: i.tanggal_terbit,
                }
            })
            
            if (dataArtikel) {
                output = {
                    status: {
                        code: 200,
                        message: "Sukses Get Data"
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

// DATA ARTIKEL BY ID
exports.getArtikelByID = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const dataArtikel = await models.tbl_artikel.findOne(
                {
                    where: {
                        id: req.query.id
                    }
                }
            )
            
            if (dataArtikel) {
                const mapping = {
                    id: dataArtikel.id,
                    link_image: '/assets/images/artikel/' + dataArtikel.image,
                    image: dataArtikel.image,
                    judul_artikel: dataArtikel.judul_artikel,
                    isi_artikel: dataArtikel.isi_artikel,
                    penulis_artikel: dataArtikel.penulis_artikel,
                    penerbit: dataArtikel.penerbit,
                    tanggal_terbit: dataArtikel.tanggal_terbit,
                }

                if (mapping) {
                    output = {
                        status: {
                            code: 200,
                            message: "Sukses Get Data"
                        },
                        data: mapping
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
// ADD BANNER
exports.addBanner = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })
            if (existUser) {
                const cekNamaBanner = await models.tbl_images.findOne({
                    where: {
                        name: req.body.name,
                    }
                })
                
                if (!cekNamaBanner) {
                    const createBanner = await models.tbl_images.create({
                        name: req.body.name,
                        description: req.body.description,
                        product_id: null,
                        link: '/assets/images/banner/' + req.file.filename,
                        images: req.file.filename,
                        type: 'banner',
                    })

                    if (createBanner) {
                        output = {
                            status: {
                                code: 200,
                                message: "Berhasil menambahkan banner baru"
                            }
                        }
                    }
                } else {
                    output = {
                        status: {
                            code: 400,
                            message: 'Gagal menambahkan, nama banner ini sudah digunakan'
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses dikarenakan belum login'
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

// EDIT NAMA BANNER
exports.editBanner = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })
            if (existUser) {
                const cekNamaBanner = await models.tbl_images.findOne({
                    where: {
                        name: req.body.name,
                    }
                })

                if (req.file) {
                    if (!cekNamaBanner) {
                        const cekImage = await models.tbl_images.findOne(
                            {
                                where: {
                                    id: req.query.id,
                                }
                            }
                        )

                        fs.unlinkSync(`./public/assets/images/banner/${cekImage.images}`);
                        
                        const editBanner = await models.tbl_images.update(
                            {
                                name: req.body.name,
                                description: req.body.description,
                                link: '/assets/images/banner/' + req.file.filename,
                                images: req.file.filename,
                            },
                            {
                                where: {
                                    id: req.query.id,
                                }
                            }
                        )

                        if (editBanner) {
                            output = {
                                status: {
                                    code: 200,
                                    message: "Berhasil mengubah data banner"
                                }
                            }
                        }
                    } else {
                        output = {
                            status: {
                                code: 400,
                                message: 'Gagal menambahkan, nama banner ini sudah digunakan'
                            }
                        }
                    }
                } else {
                    output = {
                        status: {
                            code: 400,
                            message: 'Gambar tidak boleh kosong'
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses dikarenakan belum login'
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

// DELETE BANNER
exports.deleteBanner = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })
            if (existUser) {
                const cekImage = await models.tbl_images.findOne(
                    {
                        where: {
                            id: req.query.id,
                        }
                    }
                )

                fs.unlinkSync(`./public/assets/images/banner/${cekImage.images}`);

                const deleteBanner = await models.tbl_images.destroy({
                    where: {
                        id: req.query.id,
                    }
                })
                
                if (deleteBanner) {
                    output = {
                        status: {
                            code: 200,
                            message: "Berhasil menghapus banner"
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses dikarenakan belum login'
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



// ADD ALAMAT KATARASA
exports.addAlamatKatarasa = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })
            if (existUser) {
                const cekNamaAlamat = await models.tbl_address_katarasa.findOne({
                    where: {
                        address: req.body.address,
                    }
                })
                
                if (!cekNamaAlamat) {
                    const addAlamat = await models.tbl_address_katarasa.create(
                        {
                            title_address: req.body.title_address,
                            address: req.body.address,
                            pic: req.body.pic,
                            phone_number: req.body.phone_number,
                            province_id: req.body.province_id,
                            city_id: req.body.city_id,
                            district_id: req.body.district_id,
                            sub_district_id: req.body.sub_district_id,
                            postal_code: req.body.postal_code,
                        },
                    )

                    if (addAlamat) {
                        output = {
                            status: {
                                code: 200,
                                message: "Berhasil menambahkan data alamat katarasa"
                            }
                        }
                    }
                } else {
                    output = {
                        status: {
                            code: 400,
                            message: 'Gagal menambahkan, nama alamat lengkap ini sudah digunakan'
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses dikarenakan belum login'
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

// EDIT ALAMAT KATARASA
exports.editAlamatKatarasa = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })
            if (existUser) {
                const cekNamaAlamat = await models.tbl_address_katarasa.findOne({
                    where: {
                        address: req.body.address,
                    }
                })
                
                if (!cekNamaAlamat) {
                    const editAlamat = await models.tbl_address_katarasa.update(
                        {
                            title_address: req.body.title_address,
                            address: req.body.address,
                            pic: req.body.pic,
                            phone_number: req.body.phone_number,
                            province_id: req.body.province_id,
                            city_id: req.body.city_id,
                            district_id: req.body.district_id,
                            sub_district_id: req.body.sub_district_id,
                            postal_code: req.body.postal_code,
                        },
                        {
                            where: {
                                id: req.body.id
                            }
                        }
                    )

                    if (editAlamat) {
                        output = {
                            status: {
                                code: 200,
                                message: "Berhasil mengubah data alamat katarasa"
                            }
                        }
                    }
                } else {
                    output = {
                        status: {
                            code: 400,
                            message: 'Gagal mengubah, nama alamat lengkap ini sudah digunakan'
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses dikarenakan belum login'
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

// EDIT ALAMAT KATARASA
exports.deleteAlamatKatarasa = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })
            if (existUser) {
                const cekAlamat = await models.tbl_address_katarasa.findOne({
                    where: {
                        id: req.query.id,
                    }
                })
                
                if (cekAlamat) {
                    const editAlamat = await models.tbl_address_katarasa.destroy(
                        {
                            where: {
                                id: req.query.id
                            }
                        }
                    )

                    if (editAlamat) {
                        output = {
                            status: {
                                code: 200,
                                message: "Berhasil menghapus data alamat katarasa"
                            }
                        }
                    }
                } else {
                    output = {
                        status: {
                            code: 400,
                            message: 'Alamat sudah dihapus'
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses dikarenakan belum login'
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



// ADD ARTIKEL
exports.addArtikel = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })
            if (existUser) {
                const cekNamaArtikel = await models.tbl_artikel.findOne({
                    where: {
                        judul_artikel: req.body.judul_artikel,
                    }
                })
                
                if (!cekNamaArtikel) {
                    const addArtikel = await models.tbl_artikel.create(
                        {
                            image: req.file.filename,
                            judul_artikel: req.body.judul_artikel,
                            isi_artikel: req.body.isi_artikel,
                            penulis_artikel: req.body.penulis_artikel,
                            penerbit: req.body.penerbit,
                            status: 1,
                            date_created: Date.now(),
                        },
                    )

                    if (addArtikel) {
                        output = {
                            status: {
                                code: 200,
                                message: "Berhasil menambahkan artikel terbaru"
                            }
                        }
                    }
                } else {
                    output = {
                        status: {
                            code: 400,
                            message: 'Gagal menambahkan, judul artikel ini sudah digunakan'
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses dikarenakan belum login'
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

// EDIT ARTIKEL
exports.editArtikel = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })
            if (existUser) {
                const cekJudulArtikel = await models.tbl_artikel.findOne({
                    where: {
                        judul_artikel: req.body.judul_artikel,
                    }
                })
                
                if (!cekJudulArtikel) {
                    const cekImage = await models.tbl_artikel.findOne({
                        where: {
                            id: req.query.id
                        }
                    })
                    
                    if(req.file){
                        fs.unlinkSync(`./public/assets/images/artikel/${cekImage.image}`);

                        const editArtikel = await models.tbl_artikel.update(
                            {
                                image: req.file.filename,
                                judul_artikel: req.body.judul_artikel,
                                isi_artikel: req.body.isi_artikel,
                                penulis_artikel: req.body.penulis_artikel,
                                penerbit: req.body.penerbit,
                                date_created: Date.now(),
                            },
                            {
                                where: {
                                    id: req.query.id
                                }
                            }
                        )

                        if (editArtikel) {
                            output = {
                                status: {
                                    code: 200,
                                    message: "Berhasil mengubah data artikel"
                                }
                            }
                        }
                    } else {
                        output = {
                            status: {
                                code: 400,
                                message: 'Gambar artikel tidak boleh kosong'
                            }
                        }
                    }
                } else {
                    output = {
                        status: {
                            code: 400,
                            message: 'Gagal mengubah, judul artikel ini sudah digunakan'
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses dikarenakan belum login'
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

// DELETE ARTIKEL
exports.deleteArtikel = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_admin.findOne({
                where: {
                    id: req.user.id,
                }
            })
            if (existUser) {
                const cekDataArtikel = await models.tbl_artikel.findOne({
                    where: {
                        id: req.query.id
                    }
                })
                
                if(cekDataArtikel){
                    fs.unlinkSync(`./public/assets/images/artikel/${cekDataArtikel.image}`);

                    const editArtikel = await models.tbl_artikel.destroy(
                        {
                            where: {
                                id: req.query.id
                            }
                        }
                    )

                    if (editArtikel) {
                        output = {
                            status: {
                                code: 200,
                                message: "Berhasil menghapus data artikel"
                            }
                        }
                    }
                } else {
                    output = {
                        status: {
                            code: 400,
                            message: 'Data artikel tidak tersedia'
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Anda tidak dapat mengakses dikarenakan belum login'
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