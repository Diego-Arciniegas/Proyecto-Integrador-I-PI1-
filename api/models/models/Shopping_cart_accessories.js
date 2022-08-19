const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Shopping_cart_accessories = db.define('shopping_cart_accessories', {
    id_shopping_cart_accessories: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_shopping_cart: DataTypes.STRING,
    id_accessory: DataTypes.STRING,
    quantity: DataTypes.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Shopping_cart_accessories;
