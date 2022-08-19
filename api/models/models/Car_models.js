const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Car_models = db.define('car_models', {
    id_car_model: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_car_model: DataTypes.STRING,
    description: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Car_models;
