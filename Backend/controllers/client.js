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
// add cartegory

exports.addClient = async (req, res, next) => {
     try {
           data = req.body;
          data.password = await bcrypt.hash(data.password);
          const client = await signUp(data);
          res.status(httpstatus.CREATED).json({
               client,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};

exports.getClients = async (req, res, next) => {
     try {
          const clients = await getClients();
          res.status(httpstatus.OK).json({
               clients,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};

exports.getClientById = async (req, res, next) => {
     try {
          const client = await getClientById(req.params.id);
          res.status(httpstatus.OK).json({
               client,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};

exports.editClient = async (req, res, next) => {
     try {
          const client = await editClient(req.params.id, req.body);
          res.status(httpstatus.OK).json({
               client,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};

exports.removeClient = async (req, res, next) => {
     try {
          const client = await removeClient(req.params.id);
          res.status(httpstatus.OK).json({
               client,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};

exports.login = async(req, res, next) => {
     try{
          const { email, password } = req.body;
          const client = await prisma.client.findUnique({
               where: {
                    email,
               },
          });
          if(client){
               const isMatch = await bcrypt.compare(password, client.password);
               if(isMatch){
                    res.status(httpstatus.OK).json({
                         client,
                    });
               }else{
                    res.status(httpstatus.FORBIDDEN).json({
                         message: "Invalid password",
                    });
               }
          }else{
               res.status(httpstatus.FORBIDDEN).json({
                    message: "Invalid email",
               });
          }

     }catch(error){
          logger.error(error);
          next(new CustomError(500, error));
     };
};