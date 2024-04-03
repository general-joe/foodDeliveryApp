const express = require('express');
const router = express.Router();
const client = require("../../../controllers/client");

router.post("/signUp", client.signUp);
router.post("/login", client.login);
router.get("/list", client.getClients);

module.exports = router;

