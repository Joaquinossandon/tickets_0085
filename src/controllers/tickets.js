const Ticket = require("../models/Ticket");

const getAll = async (req, res) => {
    const tickets = await Ticket.findAll();
    res.json(tickets);
};

const create = async (req, res) => {
    const { name } = req.body;

    const ticket = await Ticket.create({
        name,
    });

    res.json(ticket);
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findByPk(id);

        if (!ticket) throw new Error("El ticket no se encontró");

        res.json(ticket);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const updatedTicket = await Ticket.update(
            { name },
            {
                where: {
                    id,
                },
                returning: true,
            }
        );

        const [rowCount, rowsInfo] = updatedTicket;

        if (!rowCount) throw new Error("No existe un ticket con ese id");

        res.status(200).json(rowsInfo);
    } catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
};

const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;

        await Ticket.destroy({
            where: {
                id,
            },
        });

        res.status(200).json({
            message: "Se eliminó correctamente el ticket",
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

const renderTickets = async (req, res) => {
    const tickets = await Ticket.findAll();

    res.render("index", {
        tickets,
    });
};

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteOne,
    renderTickets,
};
