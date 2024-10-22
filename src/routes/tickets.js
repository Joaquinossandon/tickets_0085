const { Router } = require("express");
const ticketsController = require("../controllers/tickets");

const router = Router();

router.get("/tickets", ticketsController.getAll);

router.post("/tickets", ticketsController.create);

router.get("/tickets/:id", ticketsController.getById);

router.put("/tickets/:id", ticketsController.update);

router.delete("/tickets/:id", ticketsController.deleteOne);

module.exports = router;
