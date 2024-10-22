// Requerir express
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/database");
const Message = require("./src/models/Message");
const Ticket = require("./src/models/Ticket");

// inicializar mi app
const app = express();

// midleware
app.use(bodyParser.json());

// rutas
app.get("/", (req, res) => {
    res.send("Soy una app de tickets");
});

app.get("/tickets", async (req, res) => {
    const tickets = await Ticket.findAll();
    res.json(tickets);
});

app.post("/tickets", async (req, res) => {
    const { name } = req.body;

    const ticket = await Ticket.create({
        name,
    });

    res.json(ticket);
});

app.get("/tickets/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findByPk(id);

        if (!ticket) throw new Error("El ticket no se encontró");

        res.json(ticket);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.put("/tickets/:id", async (req, res) => {
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

        const [_, rowsInfo] = updatedTicket;

        res.status(200).json(rowsInfo);
        
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

app.delete("/tickets/:id", (req, res) => {
    try {
        const { id } = req.params;

        const indexTicket = tickets.findIndex((ticket) => ticket.id == id); // este devuelve -1 en caso de no encontrar coincidencias

        if (indexTicket === -1) throw new Error("Ticket no existe");

        const deletedTickets = tickets.splice(indexTicket, 1);

        res.status(200).json({
            deleted: deletedTickets,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

// hacer la funcionalidad de eliminar el ticket! :D

app.get("/tickets/:id/mensajes", (req, res) => {
    try {
        const { id } = req.params;
        // las queries son los valores que asignamos luego de la ruta.
        // su inicio es demarcado por "?"
        // ej: /tickets/10/mensajes?order=fecha&clave=valor
        // se usa el ampersand "&" para decir que tengo otro par clave=valor
        const ticket = tickets.find((ticket) => ticket.id == id); // si no encuentra coincidencias devuelve undefined

        if (!ticket) throw new Error("No se encontró el ticket");

        res.status(200).json({
            idTicket: id,
            messages: ticket.messages,
        });
    } catch (error) {
        res.status(400).json({
            error: "ticket no encontrado",
        });
    }
});

app.post("/tickets/:id/mensajes", (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const indexTicket = tickets.findIndex((ticket) => ticket.id == id); // en caso de no encontrar coincidencias devuelve -1

        if (indexTicket === -1) throw new Error("Ticket no encontrado");

        const ticket = tickets[indexTicket];
        const messageId = ticket.messages.length + 1;
        const message = { id: messageId, text };

        ticket.messages.push(message);

        tickets[indexTicket] = ticket;

        res.status(201).json({
            message: "Se creó el mensaje",
            result: tickets[indexTicket].messages,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

app.get("/tickets/:id/mensajes/:idMensaje", (req, res) => {
    try {
        const { id, idMensaje } = req.params;

        const ticket = tickets.find((ticket) => ticket.id == id); // || undefined
        if (!ticket) throw new Error("El ticket no existe");

        const message = ticket.messages.find(
            (message) => message.id == idMensaje
        ); // || undefined
        if (!message) throw new Error("El mensaje no existe");

        res.status(200).json({
            message,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

app.put("/tickets/:id/mensajes/:idMensaje", (req, res) => {
    const { id, idMensaje } = req.params;
    res.send(`Actualizando el mensaje ${idMensaje} del ticket ${id}`);
});

app.delete("/tickets/:id/mensajes/:idMensaje", (req, res) => {
    const { id, idMensaje } = req.params;
    res.send(`Eliminando el mensaje ${idMensaje} del ticket ${id}`);
});

app.patch("/tickets/:id/mensajes/:idMensaje", (req, res) => {
    const { id, idMensaje } = req.params;
    res.send(
        `Actualizando parcialmente el mensaje ${idMensaje} del ticket ${id}`
    );
});

async function run() {
    await sequelize.sync();
    // levantar la aplicación
    app.listen(3000, () => {
        console.log("El servidor se está ejecutando en http://localhost:3000");
    });
}

run();
