const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Ticket = require("./Ticket");

const Message = sequelize.define("message", {
    text: {
        type: DataTypes.STRING,
    },
});

Message.belongsTo(Ticket);

module.exports = Message;
