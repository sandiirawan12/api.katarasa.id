const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_customer_order', {
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    invoice: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    antrian: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    payment: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "Cash, PayLater, QRIS"
    },
    payment_status: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    shipment: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "Take Away, COD"
    },
    expedisi: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ongkir: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    diskon: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    status_order: {
      type: DataTypes.ENUM('New Order','Process','Done','Reject','Pending','Cancel','Delivery'),
      allowNull: false,
      comment: "New Order, Process ,Reject, Selesai"
    },
    status_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_customer_order',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "fk_tbl_cart_tbl_products1_idx",
        using: "BTREE",
        fields: [
          { name: "address_id" },
        ]
      },
      {
        name: "fk_tbl_cart_tbl_customer1_idx",
        using: "BTREE",
        fields: [
          { name: "customer_id" },
        ]
      },
    ]
  });
};
