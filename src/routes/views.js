const { Router } = require("express");
const ticketsController = require("../controllers/tickets");

const router = Router();

router.get("/", ticketsController.renderTickets);

module.exports = router;
