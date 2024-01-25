const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_product', {
    product_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    shop: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    information: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    images: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipe_diskon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    discount: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    is_bestseller: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    is_flashsale: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    is_coming_soon: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    categories_children_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbl_categories_children',
        key: 'id'
      }
    },
    categories_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbl_categories',
        key: 'id'
      }
    },
    slug: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    catalog: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'tbl_product',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fk_tbl_products_tbl_categories_children1_idx",
        using: "BTREE",
        fields: [
          { name: "categories_children_id" },
        ]
      },
      {
        name: "fk_tbl_products_tbl_categories1_idx",
        using: "BTREE",
        fields: [
          { name: "categories_id" },
        ]
      },
    ]
  });
};
