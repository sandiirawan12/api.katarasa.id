var express = require('express');
var router = express.Router();



// CONTROLLER
const otherNimdaController = require('../../controllers/nimda/other.controller')
// ------



// MIDDLEWARE
const authentication = require('../../middleware/auth/private.middleware')
const otherNimdaMiddleware = require('../../middleware/nimda/other.middleware')
// ------



// PLUGIN
const plugins = require('../../plugins/uploader')
// ------



// ================= DATA DI BAWAH SUDAH ROUTES API  ==============================
// ================== ========= Vvv vvV =========  ================================




// GET
// DATA DASHBOARD
router.get('/data-dashboard', authentication, otherNimdaController.getDashboard)



// DATA BANNER
router.get('/data-banner', otherNimdaController.getBanner)

// DATA BANNER DETAIL
router.get('/data-banner-detail', otherNimdaMiddleware.validate('data-banner-detail'), authentication, otherNimdaController.getBannerDetail)



// DATA ALAMAT KATARASA
router.get('/data-alamat-katarasa', authentication, otherNimdaController.getAlamatKatarasa)

// DATA ALAMAT KATARASA BY ID
router.get('/data-alamat-katarasa-by', authentication, otherNimdaMiddleware.validate('data-alamat-katarasa-by'), otherNimdaController.getAlamatKatarasaByID)



// DATA ARTIKEL
router.get('/data-artikel', otherNimdaController.getArtikel)

// DATA ARTIKEL BY ID
router.get('/data-artikel-by', otherNimdaMiddleware.validate('data-artikel-by'), otherNimdaController.getArtikelByID)
// ====================



// POST
// ADD BANNER
router.post('/add-banner', authentication, plugins.addBanner, otherNimdaMiddleware.validate('add-banner'), otherNimdaController.addBanner)

// EDIT NAMA BANNER
router.post('/edit-banner', authentication, plugins.updateBanner, otherNimdaMiddleware.validate('edit-banner'), otherNimdaController.editBanner)

// DELETE BANNER
router.post('/delete-banner', authentication, otherNimdaMiddleware.validate('delete-banner'), otherNimdaController.deleteBanner)



// ADD ALAMAT KATARASA
router.post('/add-alamat-katarasa', authentication, otherNimdaMiddleware.validate('add-alamat-katarasa'), otherNimdaController.addAlamatKatarasa)

// EDIT ALAMAT KATARASA
router.post('/edit-alamat-katarasa', authentication, otherNimdaMiddleware.validate('edit-alamat-katarasa'), otherNimdaController.editAlamatKatarasa)

// DELETE ALAMAT KATARASA
router.post('/delete-alamat-katarasa', authentication, otherNimdaMiddleware.validate('delete-alamat-katarasa'), otherNimdaController.deleteAlamatKatarasa)



// ADD ARTIKEL
router.post('/add-artikel', authentication, plugins.addArtikel, otherNimdaMiddleware.validate('add-artikel'), otherNimdaController.addArtikel)

// EDIT ARTIKEL
router.post('/edit-artikel', authentication, plugins.editArtikel, otherNimdaMiddleware.validate('edit-artikel'), otherNimdaController.editArtikel)

// DELETE ARTIKEL
router.post('/delete-artikel', authentication, otherNimdaMiddleware.validate('delete-artikel'), otherNimdaController.deleteArtikel)
// ====================



// ================= DATA DI DIATAS SUDAH FUNGSI API  ==============================
// ================== ========= ^^^ ^^^ =========  =================================



module.exports = router;