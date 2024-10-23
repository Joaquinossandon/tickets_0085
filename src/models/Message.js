const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Ticket = require("./Ticket");

const Message = sequelize.define("message", {
    text: {
        type: DataTypes.STRING,
    },
});

Message.belongsTo(Ticket);
Ticket.hasMany(Message);

module.exports = Message;
