const CustomError = require("../utils/customErrorClass");
const httpstatus = require("../utils/httpstatus");
const logger = require("../utils/loggerUtil");
const bcrypt = require("../utils/bcrypt");

const {
    signUp,
    getClients,
    getClientById,
    editClient,
    removeClient
     
} = require("../helpers/client");