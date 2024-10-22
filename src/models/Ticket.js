const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Ticket = sequelize.define("ticket", {
    name: {
        type: DataTypes.STRING,
    },
});


module.exports = Ticket;
