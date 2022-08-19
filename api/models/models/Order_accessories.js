const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Order_accessories = db.define('order_accessories', {
    id_order_accessories: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_order: DataTypes.INTEGER,
    id_accessory: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Order_accessories;
