const { Router } = require("express");
const route = Router();
const client = require("./client");
const category = require("./category");
const recipe = require("./recipe");

route.use("/client", client);
route.use("/cartegory", category);
route.use("/recipe", recipe);

module.exports = route;
