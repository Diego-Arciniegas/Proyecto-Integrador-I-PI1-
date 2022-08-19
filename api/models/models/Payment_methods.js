const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Payment_methods = db.define('payment_methods', {
    id_payment_method: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_payment: DataTypes.STRING,
    description: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Payment_methods;
