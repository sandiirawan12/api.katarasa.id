var express = require('express');
var router = express.Router();

const cors = require('cors');

// router.use(cors())

router.use(cors({
  origin: 'https://katarasa.id/',
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}))
// router.use(cors());
router.options('*', cors());
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://katarasa.id/');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
  next();
}
router.use(allowCrossDomain);



/* GET ROUTER HOME PAGE */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Katarasa Backend' });
});
// ==============



// ROUTER UTAMA CUSTOMER
router.use('/auth', require('./customer/auth.routes'))
router.use('/product', require('./customer/product.routes'))
router.use('/profile', require('./customer/profile.routes'))
router.use('/cart', require('./customer/cart.routes'))
router.use('/checkout', require('./customer/checkout.routes'))
router.use('/order', require('./customer/order.routes'))
// ==============



// ROUTER UTAMA NIMDA
router.use('/nimda/auth', require('./nimda/auth.routes'))
router.use('/nimda/user', require('./nimda/user.routes'))
router.use('/nimda/other', require('./nimda/other.routes'))
// ==============



module.exports = router;