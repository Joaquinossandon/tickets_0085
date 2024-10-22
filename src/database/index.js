const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db");

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;
