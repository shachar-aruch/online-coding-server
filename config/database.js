const Sequelize = require('sequelize');
module.exports = new Sequelize('database_name', 'username', 'password', {
 host: 'localhost',
 dialect: 'postgres',
});