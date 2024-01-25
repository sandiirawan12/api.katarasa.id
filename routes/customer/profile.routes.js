var express = require('express');
var router = express.Router();



// CONTROLLER
const profileController = require('../../controllers/customer/profile.controller')
// ------



// MIDDLEWARE
const authentication = require('../../middleware/auth/private.middleware')
const profileMiddleware = require('../../middleware/customer/profile.middleware')
// ------



// ================= DATA DI BAWAH SUDAH ROUTES API  ==============================
// ================== ========= Vvv vvV =========  ================================



// GET
// DATA PROFILE
router.get('/data-profile', authentication, profileController.getProfile);

// DATA SELECT WILAYAH
router.get('/select-data-wilayah', profileController.selectWilayah);

// DATA ALAMAT ALL
router.get('/data-alamat', authentication, profileController.dataAlamatAll);
// ====================



// POST
// TAMBAH ALAMAT BARU
router.post('/tambah-alamat', profileMiddleware.validate('tambah-alamat'), authentication, profileController.tambahAlamat);
// ====================



// PUT
// EDIT PROFILE CUSTOMER
router.put('/edit-profile', authentication, profileMiddleware.validate('edit-profile'), profileController.editProfile);

// EDIT ALAMAT CUSTOMER
router.put('/edit-alamat', profileMiddleware.validate('edit-alamat'), authentication, profileController.editAlamat);

// EDIT ALAMAT UTAMA CUSTOMER
router.put('/edit-alamat-utama', profileMiddleware.validate('edit-alamat-utama'), authentication, profileController.editAlamatUtama);

// UPDATE PASSWORD CUSTOMER
router.put('/update-password', profileMiddleware.validate('update-password'), authentication, profileController.updatePassword);
// ====================



// DELETE
// HAPUS ALAMAT CUSTOMER
router.delete('/delete-alamat', authentication, profileController.deleteAlamat);
// ====================



// ================= DATA DI DIATAS SUDAH FUNGSI API  ==============================
// ================== ========= ^^^ ^^^ =========  =================================



module.exports = router;