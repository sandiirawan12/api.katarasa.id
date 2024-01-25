var DataTypes = require("sequelize").DataTypes;
var _ro_city = require("./ro_city");
var _ro_district = require("./ro_district");
var _ro_province = require("./ro_province");
var _ro_sub_district = require("./ro_sub_district");
var _tbl_address_katarasa = require("./tbl_address_katarasa");
var _tbl_admin = require("./tbl_admin");
var _tbl_artikel = require("./tbl_artikel");
var _tbl_catalog = require("./tbl_catalog");
var _tbl_categories = require("./tbl_categories");
var _tbl_categories_children = require("./tbl_categories_children");
var _tbl_customer = require("./tbl_customer");
var _tbl_customer_address = require("./tbl_customer_address");
var _tbl_customer_cart = require("./tbl_customer_cart");
var _tbl_customer_comments = require("./tbl_customer_comments");
var _tbl_customer_notifikasi = require("./tbl_customer_notifikasi");
var _tbl_customer_order = require("./tbl_customer_order");
var _tbl_customer_order_detail = require("./tbl_customer_order_detail");
var _tbl_customer_order_token = require("./tbl_customer_order_token");
var _tbl_customer_testimonial = require("./tbl_customer_testimonial");
var _tbl_images = require("./tbl_images");
var _tbl_product = require("./tbl_product");
var _tbl_promo = require("./tbl_promo");
var _tbl_variants = require("./tbl_variants");
var _tbl_wishlist = require("./tbl_wishlist");

function initModels(sequelize) {
  var ro_city = _ro_city(sequelize, DataTypes);
  var ro_district = _ro_district(sequelize, DataTypes);
  var ro_province = _ro_province(sequelize, DataTypes);
  var ro_sub_district = _ro_sub_district(sequelize, DataTypes);
  var tbl_address_katarasa = _tbl_address_katarasa(sequelize, DataTypes);
  var tbl_admin = _tbl_admin(sequelize, DataTypes);
  var tbl_artikel = _tbl_artikel(sequelize, DataTypes);
  var tbl_catalog = _tbl_catalog(sequelize, DataTypes);
  var tbl_categories = _tbl_categories(sequelize, DataTypes);
  var tbl_categories_children = _tbl_categories_children(sequelize, DataTypes);
  var tbl_customer = _tbl_customer(sequelize, DataTypes);
  var tbl_customer_address = _tbl_customer_address(sequelize, DataTypes);
  var tbl_customer_cart = _tbl_customer_cart(sequelize, DataTypes);
  var tbl_customer_comments = _tbl_customer_comments(sequelize, DataTypes);
  var tbl_customer_notifikasi = _tbl_customer_notifikasi(sequelize, DataTypes);
  var tbl_customer_order = _tbl_customer_order(sequelize, DataTypes);
  var tbl_customer_order_detail = _tbl_customer_order_detail(sequelize, DataTypes);
  var tbl_customer_order_token = _tbl_customer_order_token(sequelize, DataTypes);
  var tbl_customer_testimonial = _tbl_customer_testimonial(sequelize, DataTypes);
  var tbl_images = _tbl_images(sequelize, DataTypes);
  var tbl_product = _tbl_product(sequelize, DataTypes);
  var tbl_promo = _tbl_promo(sequelize, DataTypes);
  var tbl_variants = _tbl_variants(sequelize, DataTypes);
  var tbl_wishlist = _tbl_wishlist(sequelize, DataTypes);

  tbl_categories_children.belongsTo(tbl_categories, { as: "category", foreignKey: "categories_id"});
  tbl_categories.hasMany(tbl_categories_children, { as: "tbl_categories_children", foreignKey: "categories_id"});
  tbl_product.belongsTo(tbl_categories, { as: "category", foreignKey: "categories_id"});
  tbl_categories.hasMany(tbl_product, { as: "tbl_products", foreignKey: "categories_id"});
  tbl_product.belongsTo(tbl_categories_children, { as: "categories_child", foreignKey: "categories_children_id"});
  tbl_categories_children.hasMany(tbl_product, { as: "tbl_products", foreignKey: "categories_children_id"});
  tbl_wishlist.belongsTo(tbl_customer, { as: "customer", foreignKey: "customer_id"});
  tbl_customer.hasMany(tbl_wishlist, { as: "tbl_wishlists", foreignKey: "customer_id"});
  tbl_images.belongsTo(tbl_product, { as: "product", foreignKey: "products_id"});
  tbl_product.hasMany(tbl_images, { as: "tbl_images", foreignKey: "products_id"});
  tbl_variants.belongsTo(tbl_product, { as: "product", foreignKey: "products_id"});
  tbl_product.hasMany(tbl_variants, { as: "tbl_variants", foreignKey: "products_id"});
  tbl_wishlist.belongsTo(tbl_product, { as: "product", foreignKey: "products_id"});
  tbl_product.hasMany(tbl_wishlist, { as: "tbl_wishlists", foreignKey: "products_id"});

  return {
    ro_city,
    ro_district,
    ro_province,
    ro_sub_district,
    tbl_address_katarasa,
    tbl_admin,
    tbl_artikel,
    tbl_catalog,
    tbl_categories,
    tbl_categories_children,
    tbl_customer,
    tbl_customer_address,
    tbl_customer_cart,
    tbl_customer_comments,
    tbl_customer_notifikasi,
    tbl_customer_order,
    tbl_customer_order_detail,
    tbl_customer_order_token,
    tbl_customer_testimonial,
    tbl_images,
    tbl_product,
    tbl_promo,
    tbl_variants,
    tbl_wishlist,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
