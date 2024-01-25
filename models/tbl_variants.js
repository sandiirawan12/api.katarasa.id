const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_variants', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    minimum_order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maximum_order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_out_of_stock: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    discount_label: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    discount_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    base_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    must_choose_option: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    products_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_product',
        key: 'product_id'
      }
    },
    discount_percent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'tbl_variants',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_tbl_variants_tbl_products_idx",
        using: "BTREE",
        fields: [
          { name: "products_id" },
        ]
      },
    ]
  });
};
