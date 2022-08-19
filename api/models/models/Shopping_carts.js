const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Shopping_carts = db.define('shopping_carts', {
    id_shopping_cart: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: DataTypes.INTEGER,
    date_creation: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Shopping_carts;
