const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Accessories = db.define('accessories', {
    id_accessory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_accessory: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
    image_accesory_path: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Accessories;
