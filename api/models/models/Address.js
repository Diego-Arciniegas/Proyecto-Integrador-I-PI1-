const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Address = db.define('address', {
    id_address: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    postal_code: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Address;
