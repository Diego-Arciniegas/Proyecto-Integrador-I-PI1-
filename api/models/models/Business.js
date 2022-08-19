const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Business = db.define('business', {
    id_business: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_business: DataTypes.STRING,
    id_address: DataTypes.INTEGER,
    number_phone: DataTypes.INTEGER,
    email: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Business;
