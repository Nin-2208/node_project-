const { Sequelize } = require('sequelize');

// SQLite database connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

module.exports = sequelize;
