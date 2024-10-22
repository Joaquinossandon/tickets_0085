const { Router } = require("express");
const messageRoutes = require("./messages");
const ticketRoutes = require("./tickets");
const viewsRoutes = require("./views");

const router = Router();

router.use('/api', messageRoutes);
router.use('/api', ticketRoutes);
router.use(viewsRoutes)

module.exports = router;
