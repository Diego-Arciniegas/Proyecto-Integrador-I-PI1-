const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Accessories_movement_history = db.define('accessories_movement_history', {
    id_accessory_movement_history: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_accessory: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    date_movement: DataTypes.DATE,
    id_responsible_user: DataTypes.INTEGER,
    id_movement_type: DataTypes.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Accessories_movement_history;
