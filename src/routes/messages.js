const { Router } = require("express");
const messagesController = require("../controllers/messages");

const router = Router();

router.get("/tickets/:id/mensajes", messagesController.getAllFromTicket);

router.post("/tickets/:id/mensajes", messagesController.create);

router.get("/tickets/:id/mensajes/:idMensaje", messagesController.getById);

router.put("/tickets/:id/mensajes/:idMensaje", messagesController.update);

router.delete("/tickets/:id/mensajes/:idMensaje", messagesController.deleteOne);

router.patch("/tickets/:id/mensajes/:idMensaje", messagesController.patch);

module.exports = router;
