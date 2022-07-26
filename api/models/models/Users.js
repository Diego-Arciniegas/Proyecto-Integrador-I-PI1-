const { DataTypes } = require('sequelize');
const db = require('../../database/database.js');

const Users = db.define('users', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    second_name: DataTypes.STRING,
    name_user: DataTypes.STRING,
    identification: DataTypes.INTEGER,
    email: DataTypes.STRING,
    address: {
        type:  DataTypes.STRING,
        defaultValue: ""
    },
    date_creation: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    number_phone: DataTypes.INTEGER,
    id_user_type: DataTypes.INTEGER,
    id_user_status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    password: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Users;
