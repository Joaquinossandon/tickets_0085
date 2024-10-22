const Message = require("../models/Message");

exports.getAllFromTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const messages = await Message.findAll({
            where: {
                ticketId: id,
            },
        });

        res.status(200).json({
            idTicket: id,
            messages,
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

        const result = await Message.create(
            {
                ticketId: id,
                text,
            },
            {
                returning: true,
            }
        );

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
