const CustomError = require("../utils/customErrorClass");
const httpstatus = require("../utils/httpstatus");
const logger = require("../utils/loggerUtil");


const {
     saveOrder,
     loadOrders,
     loadOrder,
     editOrder,
     removeOrder,
} = require("../helpers/order");

exports.createOrder = async (req, res, next) => {
     try {
          const order = await saveOrder(req.body);
          res.status(httpstatus.OK).json({
               data: order,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(error.message, error.status));
     }
};

exports.getAllOrders = async (req, res, next) => {
     try {
          const orders = await loadOrders();
          res.status(httpstatus.OK).json({
               orders,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(error.message, error.status));
     }
};
exports.getSingleOrder = async (req, res, next) => {
     try {
          const { id } = req.params;
          const order = await loadOrder(id);
          res.status(200).json({
               order,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(error.message, error.status));
     }
};

exports.patchOrder = async (req, res, next) => {
     try {
          const { id } = req.params;
          const data = req.body;
          const order = await editOrder(id, data);
          res.status(200).json({
               order,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(error.message, error.status));
     }
};

exports.deleteOrder = async (req, res, next) => {
     try {
          const { id } = params;
          const order = await removeOrder(id);
          res.status(200).json({
               order,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(error.message, error.status));
     }
};
