const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Orders = db.define('orders', {
    id_order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    discount: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    total_price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    id_user: DataTypes.INTEGER,
    date_creation: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    date_deliver: DataTypes.DATE,
    id_payment_method: DataTypes.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Orders;
