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
        case 'add-banner': {
            return [
                check('name')
                    .not().isEmpty()
                    .withMessage(`Nama Banner tidak boleh kosong`),
                check('description')
                    .not().isEmpty()
                    .withMessage(`Deskripsi tidak boleh kosong`),
            ]
        }    
        case 'edit-banner': {
            return [
                check('id')
                    .not().isEmpty()
                    .withMessage(`ID Banner tidak boleh kosong`),
                check('name')
                    .not().isEmpty()
                    .withMessage(`Nama Banner tidak boleh kosong`),
                check('description')
                    .not().isEmpty()
                    .withMessage(`Deskripsi tidak boleh kosong`),
            ]
        }
        case 'delete-banner': {
            return [
                check('id')
                    .not().isEmpty()
                    .withMessage(`ID Banner tidak boleh kosong`),
            ]
        } 
        case 'data-banner-detail': {
            return [
                check('id')
                    .not().isEmpty()
                    .withMessage(`ID Banner tidak boleh kosong`),
            ]
        }
            
            
            
        case 'data-alamat-katarasa-by': {
            return [
                check('id')
                    .not().isEmpty()
                    .withMessage(`ID Alamat tidak boleh kosong`),
            ]
        } 
        case 'add-alamat-katarasa': {
            return [
                check('title_address')
                    .not().isEmpty()
                    .withMessage(`Judul Nama Alamat tidak boleh kosong`),
                check('address')
                    .not().isEmpty()
                    .withMessage(`Nama Alamat tidak boleh kosong`),
                check('pic')
                    .not().isEmpty()
                    .withMessage(`PIC tidak boleh kosong`),
                check('phone_number')
                    .not().isEmpty()
                    .withMessage(`No Telp tidak boleh kosong`),
                check('province_id')
                    .not().isEmpty()
                    .withMessage(`Provinsi boleh kosong`),
                check('city_id')
                    .not().isEmpty()
                    .withMessage(`Kota tidak boleh kosong`),
                check('district_id')
                    .not().isEmpty()
                    .withMessage(`Kecamatan tidak boleh kosong`),
                check('sub_district_id')
                    .not().isEmpty()
                    .withMessage(`Kabupaten tidak boleh kosong`),
                check('postal_code')
                    .not().isEmpty()
                    .withMessage(`Kode Pos tidak boleh kosong`),
            ]
        }
        case 'edit-alamat-katarasa': {
            return [
                check('id')
                    .not().isEmpty()
                    .withMessage(`ID Alamat tidak boleh kosong`),
                check('title_address')
                    .not().isEmpty()
                    .withMessage(`Judul Nama Alamat tidak boleh kosong`),
                check('address')
                    .not().isEmpty()
                    .withMessage(`Nama Alamat tidak boleh kosong`),
                check('pic')
                    .not().isEmpty()
                    .withMessage(`PIC tidak boleh kosong`),
                check('phone_number')
                    .not().isEmpty()
                    .withMessage(`No Telp tidak boleh kosong`),
                check('province_id')
                    .not().isEmpty()
                    .withMessage(`Provinsi boleh kosong`),
                check('city_id')
                    .not().isEmpty()
                    .withMessage(`Kota tidak boleh kosong`),
                check('district_id')
                    .not().isEmpty()
                    .withMessage(`Kecamatan tidak boleh kosong`),
                check('sub_district_id')
                    .not().isEmpty()
                    .withMessage(`Kabupaten tidak boleh kosong`),
                check('postal_code')
                    .not().isEmpty()
                    .withMessage(`Kode Pos tidak boleh kosong`),
            ]
        }
        case 'delete-alamat-katarasa': {
            return [
                check('id')
                    .not().isEmpty()
                    .withMessage(`ID Alamat tidak boleh kosong`),
            ]
        }
            
           
            
        case 'data-artikel-by': {
            return [
                check('id')
                    .not().isEmpty()
                    .withMessage(`ID Artikel tidak boleh kosong`),
            ]
        }  
        case 'add-artikel': {
            return [
                check('judul_artikel')
                    .not().isEmpty()
                    .withMessage(`Judul artikel tidak boleh kosong`),
                check('isi_artikel')
                    .not().isEmpty()
                    .withMessage(`Isi artikel tidak boleh kosong`),
                check('penulis_artikel')
                    .not().isEmpty()
                    .withMessage(`Penulis artikel tidak boleh kosong`),
                check('penerbit')
                    .not().isEmpty()
                    .withMessage(`Penerbit artikel tidak boleh kosong`),
            ]
        } 
        case 'edit-artikel': {
            return [
                check('id')
                    .not().isEmpty()
                    .withMessage(`ID artikel tidak boleh kosong`),
                check('judul_artikel')
                    .not().isEmpty()
                    .withMessage(`Judul artikel tidak boleh kosong`),
                check('isi_artikel')
                    .not().isEmpty()
                    .withMessage(`Isi artikel tidak boleh kosong`),
                check('penulis_artikel')
                    .not().isEmpty()
                    .withMessage(`Penulis artikel tidak boleh kosong`),
                check('penerbit')
                    .not().isEmpty()
                    .withMessage(`Penerbit artikel tidak boleh kosong`),
            ]
        } 
        case 'delete-artikel': {
            return [
                check('id')
                    .not().isEmpty()
                    .withMessage(`ID artikel tidak boleh kosong`),
            ]
        }
    }
}

// ================= DATA DI DIATAS SUDAH VALIDASI  ==============================
// ================== ========= ^^^ ^^^ =========   ==============================