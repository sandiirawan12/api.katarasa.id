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
// DATA PROFILE
exports.getProfile = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    
    try {
        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_customer.findOne({
                where: {
                    id: req.user.id,
                }
            })

            // const dataProfileJaja = await core.axios.get(
            //     `${core.baseUrlJAJA}user/profile`,
            //     {
            //         headers: { 
            //             'Authorization': existUser.token_jaja, 
            //         }
            //     }
            // )
            // const resJaja = dataProfileJaja.data.data

            const mapping = {
                name: existUser.name,
                nip: existUser.nip,
                corporate: existUser.corporate,
                department: existUser.department,
                birth_date: core.moment(existUser.birth_date).format('DD MMMM YYYY'),
                phone_number: existUser.phone_number,
                email: existUser.email,
                gender_id: existUser.gender_id,
            }
            
            if (existUser) {  
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

// DATA SELECT WILAYAH
exports.selectWilayah = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const dataProvinsi = await models.ro_province.findAll()

        const dataKota = await models.ro_city.findAll({
            where: {
                province_id: req.query.province_id,
            }
        })
        
        const dataKabupaten = await models.ro_district.findAll({
            where: {
                city_id: req.query.city_id,
            }
        })

        const dataKecamatan = await models.ro_sub_district.findAll({
            where: {
                district_kd: req.query.district_kd,
            }
        })

        const mappingProvinsi = dataProvinsi.map((i) => {
            return {
                province_id: i.province_id ,
                name: i.province,
            }
        })

        const mappingKota = dataKota.map((i) => {
            return {
                city_id: i.city_id,
                name: i.city,
            }
        })

        const mappingKabupaten = dataKabupaten.map((i) => {
            return {
                district_id: i.district_id,
                name: i.district,
                district_kd: i.district_kd,
            }
        })

        const mappingKecamatan = dataKecamatan.map((i) => {
            return {
                sub_district_id : i.sub_district_id ,
                name: i.sub_district,
                sub_district_kd: i.sub_district_kd,
            }
        })
        
        const mappingAll = {
            selectProvinsi: mappingProvinsi,
            selectKota: mappingKota,
            selectKabupaten: mappingKabupaten,
            selectKecamatan: mappingKecamatan,
        }

        if (mappingAll) {
            output = {
                status: {
                    code: 200,
                    message: "SUCCES GET DATA"
                },
                data: mappingAll
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

// DATA ALAMAT ALL
exports.dataAlamatAll = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        })

        // const dataAlamat = await core.axios.get(
        //     `${core.baseUrlJAJA}user/profile`,
        //     {
        //         headers: { 
        //             'Authorization': existUser.token_jaja, 
        //         }
        //     }
        // )
        // const resJajaAlamat = dataAlamat.data.data.location
        
        const dataAlamat = await models.tbl_customer_address.findAll({
            where: {
                customer_id: existUser.id,
            },
            order: [['is_primary', 'DESC']]
        })

        const mapping = dataAlamat.map((i) => {
            return {
                id: i.id,
                customer_id: i.customer_id,
                address_as: i.address_as,
                receiver_name: i.receiver_name,
                phone_number: i.phone_number,
                complete_address: i.complete_address,
                postal_code: i.postal_code,
                province: {
                    id: i.province_id ,
                    name: i.province,
                },
                city: {
                    id: i.city_id ,
                    name: i.city,
                },
                district: {
                    id: i.district_id ,
                    name: i.district,
                },
                sub_district: {
                    id: i.sub_district_id ,
                    name: i.sub_district,
                },
                isPrimary: i.is_primary
            }
        })

        if (mapping) {
            output = {
                status: {
                    code: 200,
                    message: "SUCCES GET DATA"
                },
                data: mapping
            }
        } else {
            output = {
                status: {
                    code: 400,
                    message: 'Akun belum login, silahkan login'
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
// TAMBAH ALAMAT BARU
exports.tambahAlamat = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        })

        const cekProvinsi = await models.ro_province.findOne({
            where: {
                province_id: req.body.province_id,
            }
        })

        const cekKota = await models.ro_city.findOne({
            where: {
                city_id: req.body.city_id,
            }
        })

        const cekKabupaten = await models.ro_district.findOne({
            where: {
                district_id: req.body.district_id,
            }
        })

        const cekKecamatan = await models.ro_sub_district.findOne({
            where: {
                sub_district_id: req.body.sub_district_id,
            }
        })

        if (existUser) {
            // const tambahAlamatJaja = await core.axios.post(
            //     `${core.baseUrlJAJA}user/address`,
            //     {
            //         label: req.body.address_as == 'Rumah' ? 'Alamat Rumah' : 'Alamat Kantor',
            //         receiverName: req.body.receiver_name,
            //         phoneNumber: req.body.phone_number,
            //         address: req.body.alamat_lengkap,
            //         addressGoogle: "",
            //         latitude: "",
            //         longitude: "",
            //         provinceId: req.body.province_id,
            //         cityId: req.body.city_id,
            //         districtId: req.body.district_id,
            //         subDistrictId: req.body.sub_district_id,
            //         postalCode: req.body.postal_code
            //     },
            //     {
            //         headers: {
            //             'Authorization': existUser.token_jaja,
            //         }
            //     },
            // )

            // if (tambahAlamatJaja.data.status.code === 400) {
            //     output = {
            //         status: {
            //             code: 400,
            //             message: 'Tambah alamat akun jaja tidak berhasil'
            //         }
            //     }
            // } else {
            //     // const cekAlamatUtama = await models.tbl_customer_address.findAll({
            //     //      where: {
            //     //         customer_id: req.user.id,
            //     //         is_primary: 1,
            //     //     }
            //     // })
                 
            //     // const createAlamat = await models.tbl_customer_address.create({
            //     //     customer_id: req.user.id,
            //     //     address_as: req.body.address_as, // Kantor Atau Rumah
            //     //     company_as: req.body.company_as,
            //     //     divisi_as: req.body.divisi_as,
            //     //     receiver_name: req.body.receiver_name,
            //     //     phone_number: req.body.phone_number,
            //     //     mobile_phone_number: req.body.phone_number,
            //     //     province_id: req.body.province_id,
            //     //     province: cekProvinsi.province,
            //     //     city_id : req.body.city_id,
            //     //     city: cekKota.city,
            //     //     district_id: req.body.district_id,
            //     //     district: cekKabupaten.district,
            //     //     sub_district_id: req.body.sub_district_id,
            //     //     sub_district: cekKecamatan.sub_district,
            //     //     postal_code: req.body.postal_code,
            //     //     complete_address: req.body.alamat_lengkap,
            //     //     is_primary: cekAlamatUtama.length === 0 ? '1' : '0'
            //     // })

            //     // if (createAlamat) {
            //     //     output = {
            //     //         status: {
            //     //             code: 200,
            //     //             message: "Tambah alamat baru berhasil"
            //     //         }
            //     //     }
            //     // }
                 
            //      output = {
            //         status: {
            //             code: 200,
            //             message: "Tambah alamat baru berhasil"
            //         }
            //     }
            // }

            const cekAlamatUtama = await models.tbl_customer_address.findAll({
                where: {
                    customer_id: req.user.id,
                    is_primary: 1,
                }
            })
                
            const createAlamat = await models.tbl_customer_address.create({
                customer_id: req.user.id,
                address_as: req.body.address_as, // Kantor Atau Rumah
                company_as: req.body.company_as ? req.body.company_as : '',
                divisi_as: req.body.divisi_as ? req.body.divisi_as : '',
                receiver_name: req.body.receiver_name,
                phone_number: req.body.phone_number,
                mobile_phone_number: req.body.phone_number,
                province_id: req.body.province_id,
                province: cekProvinsi.province,
                city_id : req.body.city_id,
                city: cekKota.city,
                district_id: req.body.district_id,
                district: cekKabupaten.district,
                sub_district_id: req.body.sub_district_id,
                sub_district: cekKecamatan.sub_district,
                postal_code: req.body.postal_code,
                complete_address: req.body.alamat_lengkap,
                is_primary: cekAlamatUtama.length === 0 ? '1' : '0'
            })

            if (createAlamat) {
                output = {
                    status: {
                        code: 200,
                        message: "Tambah alamat baru berhasil"
                    }
                }
            }
        } else {
            output = {
                status: {
                    code: 400,
                    message: 'Tidak dapat di akses dikarenakan belum login'
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
// EDIT PROFILE CUSTOMER
exports.editProfile = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)
    
    try {

        if (!errorsFromMiddleware) {
            const existUser = await models.tbl_customer.findOne({
                where: {
                    id: req.user.id,
                }
            })

            if (existUser) {
                // const editProfileJaja = await core.axios.put(
                //     `${core.baseUrlJAJA}user/profile`,
                //     {
                //         name: req.body.namaLengkap,
                //         phoneNumber: req.body.phoneNumber,
                //         email: existUser.email,
                //         gender: req.body.gender == 1 ? 'pria' : 'wanita',
                //         birthDate: req.body.tanggalLahir,
                //         photo: ''
                //     },
                //     {
                //         headers: {
                //             'Authorization': existUser.token_jaja,
                //         }
                //     },
                // )
                
                // if (editProfileJaja.data.status.code === 400) {
                //     output = {
                //         status: {
                //             code: 400,
                //             message: 'Edit akun jaja tidak berhasil'
                //         }
                //     }
                // } else {
                //     const updatePassword = await models.tbl_customer.update(
                //         {
                //             name: req.body.namaLengkap,
                //             nip: req.body.nip,
                //             corporate: req.body.corporate,
                //             department: req.body.department,
                //             birth_date: req.body.tanggalLahir,
                //             phone_number: req.body.phoneNumber,
                //             gender_id: req.body.gender,
                //         },
                //         {
                //             where: {
                //                 id: req.user.id,
                //             }
                //         }
                //     )

                //     if (updatePassword) {
                //         output = {
                //             status: {
                //                 code: 200,
                //                 message: "Berhasil mengubah data profil"
                //             }
                //         }
                //     }
                // }

                const updateProfile = await models.tbl_customer.update(
                    {
                        name: req.body.namaLengkap,
                        nip: req.body.nip,
                        corporate: req.body.corporate,
                        department: req.body.department,
                        birth_date: req.body.tanggalLahir,
                        phone_number: req.body.phoneNumber,
                        gender_id: req.body.gender,
                    },
                    {
                        where: {
                            id: req.user.id,
                        }
                    }
                )

                if (updateProfile) {
                    output = {
                        status: {
                            code: 200,
                            message: "Berhasil mengubah data profil"
                        }
                    }
                }
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'Tidak dapat di akses dikarenakan belum login'
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

// EDIT ALAMAT CUSTOMER
exports.editAlamat = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        })

        const cekProvinsi = await models.ro_province.findOne({
            where: {
                province_id: req.body.province_id,
            }
        })

        const cekKota = await models.ro_city.findOne({
            where: {
                city_id: req.body.city_id,
            }
        })

        const cekKabupaten = await models.ro_district.findOne({
            where: {
                district_id: req.body.district_id,
            }
        })

        const cekKecamatan = await models.ro_sub_district.findOne({
            where: {
                sub_district_id: req.body.sub_district_id,
            }
        })

        if (existUser) {
            // const editAlamatJaja = await core.axios.put(
            //     `${core.baseUrlJAJA}user/address`,
            //     {
            //         addressId: req.query.id_address,
            //         label: req.body.address_as == 'Rumah' ? 'Alamat Rumah' : 'Alamat Kantor',
            //         receiverName: req.body.receiver_name,
            //         phoneNumber: req.body.phone_number,
            //         address: req.body.alamat_lengkap,
            //         addressGoogle: "",
            //         latitude: "",
            //         longitude: "",
            //         provinceId: req.body.province_id,
            //         cityId: req.body.city_id,
            //         districtId: req.body.district_id,
            //         subDistrictId: req.body.sub_district_id,
            //         postalCode: req.body.postal_code
            //     },
            //     {
            //         headers: {
            //             'Authorization': existUser.token_jaja,
            //         }
            //     },
            // )

            // if (editAlamatJaja.data.status.code === 400) {
            //     output = {
            //         status: {
            //             code: 400,
            //             message: 'Edit alamat akun jaja tidak berhasil'
            //         }
            //     }
            // } else {
            //     // const updateAlamat = await models.tbl_customer_address.update(
            //     //     {
            //     //         address_as: req.body.address_as, // Kantor Atau Rumah
            //     //         company_as: req.body.company_as,
            //     //         divisi_as: req.body.divisi_as,
            //     //         receiver_name: req.body.receiver_name,
            //     //         phone_number: req.body.phone_number,
            //     //         mobile_phone_number: req.body.phone_number,
            //     //         province_id: req.body.province_id,
            //     //         province: cekProvinsi.province,
            //     //         city_id : req.body.city_id,
            //     //         city: cekKota.city,
            //     //         district_id: req.body.district_id,
            //     //         district: cekKabupaten.district,
            //     //         sub_district_id: req.body.sub_district_id,
            //     //         sub_district: cekKecamatan.sub_district,
            //     //         postal_code: req.body.postal_code,
            //     //         complete_address: req.body.alamat_lengkap
            //     //     },
            //     //     {
            //     //         where: {
            //     //             id  : req.query.id_address,
            //     //         }
            //     //     }
            //     // )

            //     // if (updateAlamat) {
            //     //     output = {
            //     //         status: {
            //     //             code: 200,
            //     //             message: "Update alamat berhasil"
            //     //         }
            //     //     }
            //     // }

            //     output = {
            //         status: {
            //             code: 200,
            //             message: "Update alamat berhasil"
            //         }
            //     }
            // }

            const updateAlamat = await models.tbl_customer_address.update(
                {
                    address_as: req.body.address_as, // Kantor Atau Rumah
                    company_as: req.body.company_as,
                    divisi_as: req.body.divisi_as,
                    receiver_name: req.body.receiver_name,
                    phone_number: req.body.phone_number,
                    mobile_phone_number: req.body.phone_number,
                    province_id: req.body.province_id,
                    province: cekProvinsi.province,
                    city_id : req.body.city_id,
                    city: cekKota.city,
                    district_id: req.body.district_id,
                    district: cekKabupaten.district,
                    sub_district_id: req.body.sub_district_id,
                    sub_district: cekKecamatan.sub_district,
                    postal_code: req.body.postal_code,
                    complete_address: req.body.alamat_lengkap
                },
                {
                    where: {
                        id  : req.query.id_address,
                    }
                }
            )

            if (updateAlamat) {
                output = {
                    status: {
                        code: 200,
                        message: "Update alamat berhasil"
                    }
                }
            }
        } else {
            output = {
                status: {
                    code: 400,
                    message: 'Akun belum login, silahkan login'
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

// EDIT ALAMAT UTAMA CUSTOMER
exports.editAlamatUtama = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        })

        if (existUser) {
            // const editUtamaAlamatJaja = await core.axios.put(
            //     `${core.baseUrlJAJA}user/changePrimaryAddress`,
            //     {
            //         addressId: req.query.id_address,
            //     },
            //     {
            //         headers: {
            //             'Authorization': existUser.token_jaja,
            //         }
            //     },
            // )

            // if (editUtamaAlamatJaja.data.status.code === 400) {
            //     output = {
            //         status: {
            //             code: 400,
            //             message: 'Edit alamat utama akun jaja tidak berhasil'
            //         }
            //     }
            // } else {
            //     // const updateAlamatAll = await models.tbl_customer_address.update(
            //     //     {
            //     //         is_primary: 0
            //     //     },
            //     //     {
            //     //         where: {
            //     //             customer_id: req.user.id
            //     //         }
            //     //     }
            //     // )

            //     // const updateAlamat = await models.tbl_customer_address.update(
            //     //     {
            //     //         is_primary: 1
            //     //     },
            //     //     {
            //     //         where: {
            //     //             id: req.query.id_address,
            //     //             customer_id: req.user.id
            //     //         }
            //     //     }
            //     // )

            //     // if (updateAlamatAll && updateAlamat) {
            //     //     output = {
            //     //         status: {
            //     //             code: 200,
            //     //             message: "Update alamat utama berhasil"
            //     //         }
            //     //     }
            //     // }

            //     output = {
            //         status: {
            //             code: 200,
            //             message: "Update alamat utama berhasil"
            //         }
            //     }
            // }

            const updateAlamatAll = await models.tbl_customer_address.update(
                {
                    is_primary: 0
                },
                {
                    where: {
                        customer_id: req.user.id
                    }
                }
            )

            const updateAlamat = await models.tbl_customer_address.update(
                {
                    is_primary: 1
                },
                {
                    where: {
                        id: req.query.id_address,
                        customer_id: req.user.id
                    }
                }
            )

            if (updateAlamatAll && updateAlamat) {
                output = {
                    status: {
                        code: 200,
                        message: "Update alamat utama berhasil"
                    }
                }
            }
        } else {
            output = {
                status: {
                    code: 400,
                    message: 'Akun belum login, silahkan login'
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

// UPDATE PASSWORD CUSTOMER
exports.updatePassword = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        })

        if (existUser) {
            // const lupaPasswordJaja = await core.axios.put(
            //     `${core.baseUrlJAJA}user/change_password/new`,
            //     {
            //         email: existUser.email,
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
            //                 id: req.user.id,
            //             }
            //         }
            //     )

            //     if (updatePassword) {
            //         output = {
            //             status: {
            //                 code: 200,
            //                 message: "Berhasil mengubah password anda"
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
                        id: req.user.id,
                    }
                }
            )

            if (updatePassword) {
                output = {
                    status: {
                        code: 200,
                        message: "Berhasil mengubah password anda"
                    }
                }
            }
        } else {
            output = {
                status: {
                    code: 400,
                    message: 'Tidak dapat di akses dikarenakan belum login'
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



// DELETE
// HAPUS ALAMAT CUSTOMER
exports.deleteAlamat = async (req, res) => {
    const errorsFromMiddleware = await customErrorMiddleware(req)

    try {
        const existUser = await models.tbl_customer.findOne({
            where: {
                id: req.user.id,
            }
        })

        if (existUser) {
            // const deleteAlamatJaja = await core.axios.get(
            //     `${core.baseUrlJAJA}user/deleteAddress?id_alamat=${req.query.id_address}`,
            //     {
            //         headers: {
            //             'Authorization': existUser.token_jaja,
            //         }
            //     },
            // )

            // if (deleteAlamatJaja.data.status.code === 400) {
            //     output = {
            //         status: {
            //             code: 400,
            //             message: 'Delete alamat akun jaja tidak berhasil'
            //         }
            //     }
            // } else {
            //     // const cekAlamat = await models.tbl_customer_address.findOne({
            //     //     where: {
            //     //         id  : req.query.id_address,
            //     //     }
            //     // })

            //     // if (cekAlamat) {
            //     //     const deleteAlamat = await models.tbl_customer_address.destroy(
            //     //         {
            //     //             where: {
            //     //                 id  : req.query.id_address,
            //     //             }
            //     //         }
            //     //     )

            //     //     const cekAlamatUtama = await models.tbl_customer_address.findOne({
            //     //         where: {
            //     //             customer_id: req.user.id
            //     //         },
            //     //         order:[['id','ASC']]
            //     //     })

            //     //     const updateAlamatUtama = await models.tbl_customer_address.update(
            //     //         {
            //     //             is_primary: 1
            //     //         },
            //     //         {
            //     //             where: {
            //     //                 id: cekAlamatUtama.id
            //     //             }
            //     //         }
            //     //     )

            //     //     if (deleteAlamat && updateAlamatUtama) {
            //     //         output = {
            //     //             status: {
            //     //                 code: 200,
            //     //                 message: "Delete alamat berhasil"
            //     //             }
            //     //         }
            //     //     }
            //     // } else {
            //     //     output = {
            //     //         status: {
            //     //             code: 400,
            //     //             message: 'ID Alamat tidak tersedia'
            //     //         }
            //     //     }
            //     // }

            //     output = {
            //         status: {
            //             code: 200,
            //             message: "Delete alamat berhasil"
            //         }
            //     }
            // }

            const cekAlamat = await models.tbl_customer_address.findOne({
                where: {
                    id: req.query.id_address,
                }
            })

            if (cekAlamat) {
                const deleteAlamat = await models.tbl_customer_address.destroy(
                    {
                        where: {
                            id: req.query.id_address,
                        }
                    }
                )

                if (deleteAlamat) {
                    output = {
                        status: {
                            code: 200,
                            message: "Delete alamat berhasil"
                        }
                    }
                }   
            } else {
                output = {
                    status: {
                        code: 400,
                        message: 'ID Alamat tidak tersedia'
                    }
                }
            }
        } else {
            output = {
                status: {
                    code: 400,
                    message: 'Akun belum login, silahkan login'
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
// ================== ========= ^^^ ^^^ =========  =================================