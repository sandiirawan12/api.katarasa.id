// PLUGIN
const uploader = {}
const path = require('path')
const multer = require('multer')
// -------------



// PATH UPLOAD PRODUCT
var uploadProductPath = ''
// ------------------

// PATH UPLOAD BANNER
var uploadBannerPath = ''
// ------------------

// PATH UPLOAD ARTIKEL
var uploadArtikelPath = ''
// ------------------



// OTHER
const currYear = new Date().getFullYear();
// ------------------



// FUNGSI UPLOAD PRODUCT
// UPLOAD IMAGE PRODUCT
const storageUploadProduct = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadProductPath)
    },
    filename: (req, file, cb) => {
        cb(null, currYear + "-" + "product" + "-" + Date.now() + path.extname(file.originalname))
    }
})
const uploadProduct = multer({ storage: storageUploadProduct })

/// ============================================ \\\

// FUNGSI UPLOAD BANNER
// UPLOAD IMAGE BANNER
const storageUploadBanner = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadBannerPath)
    },
    filename: (req, file, cb) => {
        cb(null, currYear + "-" + "banner" + "-" + Date.now() + path.extname(file.originalname))
    }
})
const uploadBanner = multer({ storage: storageUploadBanner })

/// ============================================ \\\

// FUNGSI UPLOAD ARTIKEL
// UPLOAD IMAGE ARTIKEL
const storageUploadArtikel = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadArtikelPath)
    },
    filename: (req, file, cb) => {
        cb(null, currYear + "-" + "artikel" + "-" + Date.now() + path.extname(file.originalname))
    }
})
const uploadArtikel = multer({ storage: storageUploadArtikel })
/// ============================================ \\\



// UPLOAD IMAGE PRODUCT
uploader.addProduct = uploadProduct.single('images'), uploadProductPath = `./public/assets/images/product`,
// ----------------- 
// UPLOAD IMAGE EDIT PRODUCT
uploader.editProduct = uploadProduct.single('images'), uploadProductPath = `./public/assets/images/product`,
// -----------------
    

    
// UPLOAD IMAGE BANNER
uploader.addBanner = uploadBanner.single('images'), uploadBannerPath = `./public/assets/images/banner`,
// ----------------- 
// UPLOAD IMAGE UPDATE BANNER
uploader.updateBanner = uploadBanner.single('images'), uploadBannerPath = `./public/assets/images/banner`,
// -----------------
    
    
    
// UPLOAD IMAGE BANNER
uploader.addArtikel = uploadArtikel.single('images'), uploadArtikelPath = `./public/assets/images/artikel`,
// -----------------
 // UPLOAD IMAGE BANNER
uploader.editArtikel = uploadArtikel.single('images'), uploadArtikelPath = `./public/assets/images/artikel`,
// -----------------

    
    
module.exports = uploader;