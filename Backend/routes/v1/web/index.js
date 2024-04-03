const {Router}= require('express')
const route = Router();
const client = require("./client");
route.use("/client", client);



module.exports = route;
