const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_breadcrumbs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    categories_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbl_categories',
        key: 'id'
      }
    },
    products_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbl_product',
        key: 'product_id'
      }
    },
    categories_children_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbl_categories_children',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'tbl_breadcrumbs',
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
        name: "fk_tbl_breadcrumbs_tbl_categories1_idx",
        using: "BTREE",
        fields: [
          { name: "categories_id" },
        ]
      },
      {
        name: "fk_tbl_breadcrumbs_tbl_products1_idx",
        using: "BTREE",
        fields: [
          { name: "products_id" },
        ]
      },
      {
        name: "fk_tbl_breadcrumbs_tbl_categories_children1_idx",
        using: "BTREE",
        fields: [
          { name: "categories_children_id" },
        ]
      },
    ]
  });
};
