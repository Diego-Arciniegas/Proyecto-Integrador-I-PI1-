const {Sequelize} = require('sequelize');

module.exports = new Sequelize('accesorios', 'root', process.env.PASSWORD, {
    dialect: 'mariadb',
    host: 'localhost',
    port: '3307',
    logging: false
});
