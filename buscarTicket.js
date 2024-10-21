const buscarTicket = (id, tickets) => {
    const ticketPedido = tickets.find((ticket) => ticket.id == id);
    if (!ticketPedido) {
        throw new Error("El ticket no existe");
    }
    return ticketPedido;
};

module.exports = buscarTicket;
