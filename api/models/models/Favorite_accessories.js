const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Favorite_accessories = db.define('favorite_accessories', {
    id_favorite_accessories: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: DataTypes.STRING,
    id_accessory: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Favorite_accessories;
