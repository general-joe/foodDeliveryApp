const { Router } = require("express");
const router = Router();

const client = require("../../../controllers/client");

router.post("/signUp", client.addClient);
router.post("/login", client.login);
router.get("/list", client.getClients);

module.exports = router;
