const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const User_types = db.define('user_types', {
    id_user_type: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name_user_type: DataTypes.STRING,
    description: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = User_types;
