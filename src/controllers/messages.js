const Message = require("../models/Message");
const Ticket = require("../models/Ticket");

exports.getAllFromTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findByPk(id, {
            include: Message,
        });

        res.status(200).json({
            idTicket: ticket.id,
            messages: ticket.messages,
        });
    } catch (error) {
        res.status(400).json({
            error: "ticket no encontrado",
        });
    }
};

exports.create = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const ticket = await Ticket.findByPk(id);
        const result = await ticket.createMessage({ text });

        // addMessage => Agrega un mensaje que <ya existe> y relacionarlo con un Ticket.
        // createMessage => Crea un nuevo registro en la tabla mensajes relacionada con el ticket.

        res.status(201).json({
            message: "Se creó el mensaje",
            result,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

exports.getById = async (req, res) => {
    try {
        const { id, idMensaje } = req.params;

        const message = await Message.findOne({
            where: {
                ticketId: id,
                id: idMensaje,
            },
        });

        res.status(200).json({
            message,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

exports.update = async (req, res) => {
    const { id, idMensaje } = req.params;
    const { text } = req.body;

    const [_, rowUpdated] = await Message.update(
        {
            text,
        },
        {
            where: {
                ticketId: id,
                id: idMensaje,
            },
            returning: true,
        }
    );

    res.status(200).json({
        message: rowUpdated[0],
    });
};

exports.deleteOne = (req, res) => {
    const { id, idMensaje } = req.params;
    res.send(`Eliminando el mensaje ${idMensaje} del ticket ${id}`);
};

exports.patch = (req, res) => {
    const { id, idMensaje } = req.params;
    res.send(
        `Actualizando parcialmente el mensaje ${idMensaje} del ticket ${id}`
    );
};
