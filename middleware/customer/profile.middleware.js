// MODEL DATABASE
const core = require('../../config/core.config')
const models = core.models()
// -----



// PLUGIN LAIN
const { check } = require('express-validator')
const db = require('../../config/db.config')
const CryptoJS = core.CryptoJS
// -----



// ================= DATA DI BAWAH SUDAH VALIDASI  ==============================
// ================== ========= Vvv vvV =========  ==============================

exports.validate = (method) => {
    switch (method) {
        case 'edit-profile': {
            return [
                check('namaLengkap')
                    .not().isEmpty()
                    .withMessage(`Nama Lengkap tidak boleh kosong`),
                // check('nip')
                //     .not().isEmpty()
                //     .withMessage(`NIP tidak boleh kosong`),
                // check('corporate')
                //     .not().isEmpty()
                //     .withMessage(`Perusahaan tidak boleh kosong`),
                // check('department')
                //     .not().isEmpty()
                //     .withMessage(`Departemen tidak boleh kosong`),
                check('tanggalLahir')
                    .not().isEmpty()
                    .withMessage(`Tanggal Lahir tidak boleh kosong`),
                check('phoneNumber')
                    .not().isEmpty()
                    .withMessage(`No Telp tidak boleh kosong`),
                check('gender')
                    .not().isEmpty()
                    .withMessage(`Jenis kelamin tidak boleh kosong`),
            ]
        }
            
        case 'tambah-alamat': {
            return [
                check('receiver_name')
                    .not().isEmpty()
                    .withMessage(`Nama Lengkap tidak boleh kosong`),
                check('phone_number')
                    .not().isEmpty()
                    .withMessage(`No Telp tidak boleh kosong`),
                check('address_as')
                    .not().isEmpty()
                    .withMessage(`Alamat tujuan tidak boleh kosong`),
                check('province_id')
                    .not().isEmpty()
                    .withMessage(`Provinsi tidak boleh kosong`),
                check('city_id')
                    .not().isEmpty()
                    .withMessage(`Kota tidak boleh kosong`),
                check('district_id')
                    .not().isEmpty()
                    .withMessage(`Kabupaten tidak boleh kosong`),
                check('sub_district_id')
                    .not().isEmpty()
                    .withMessage(`Kecamatan tidak boleh kosong`),
                check('postal_code')
                    .not().isEmpty()
                    .withMessage(`Kode Pos tidak boleh kosong`),
                check('alamat_lengkap')
                    .not().isEmpty()
                    .withMessage(`Alamat Lengkap tidak boleh kosong`)
            ]
        }
            
        case 'edit-alamat': {
            return [
                check('id_address')
                    .not().isEmpty()
                    .withMessage(`ID Alamat tidak boleh kosong`),
                check('receiver_name')
                    .not().isEmpty()
                    .withMessage(`Nama Lengkap tidak boleh kosong`),
                check('phone_number')
                    .not().isEmpty()
                    .withMessage(`No Telp tidak boleh kosong`),
                check('address_as')
                    .not().isEmpty()
                    .withMessage(`Alamat tujuan tidak boleh kosong`),
                check('province_id')
                    .not().isEmpty()
                    .withMessage(`Provinsi tidak boleh kosong`),
                check('city_id')
                    .not().isEmpty()
                    .withMessage(`Kota tidak boleh kosong`),
                check('district_id')
                    .not().isEmpty()
                    .withMessage(`Kabupaten tidak boleh kosong`),
                check('sub_district_id')
                    .not().isEmpty()
                    .withMessage(`Kecamatan tidak boleh kosong`),
                check('postal_code')
                    .not().isEmpty()
                    .withMessage(`Kode Pos tidak boleh kosong`),
                check('alamat_lengkap')
                    .not().isEmpty()
                    .withMessage(`Alamat Lengkap tidak boleh kosong`)
            ]
        }
            
         case 'edit-alamat-utama': {
            return [
                check('id_address')
                    .not().isEmpty()
                    .withMessage(`ID Alamat tidak boleh kosong`),
            ]
        }
            
        case 'update-password': {
            return [
                check('passwordBaru')
                    .not().isEmpty()
                    .withMessage(`Password tidak boleh kosong`)
            ]
        }
    }
}

// ================= DATA DI DIATAS SUDAH VALIDASI  ==============================
// ================== ========= ^^^ ^^^ =========   ==============================