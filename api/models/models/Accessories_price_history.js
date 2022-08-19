const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Accessories_price_history = db.define('accessories_price_history', {
    id_accessories_price_history: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_accessory: DataTypes.INTEGER,
    old_price: DataTypes.INTEGER,
    new_price: DataTypes.INTEGER,
    modified_date: DataTypes.DATE
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Accessories_price_history;
