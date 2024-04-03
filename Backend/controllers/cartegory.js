const CustomError = require("../utils/customErrorClass");
const httpstatus = require("../utils/httpstatus");
const logger = require("../utils/loggerUtil");

const {
     addCartegory,
     getCartegories,
     getSingleCartegory,
     editCartegory,
     removeCartegory,
} = require("../helpers/cartegory");
// add cartegory

exports.regiter_cartegory = async (req, res, next) => {
     try {
          const data = req.body;
          const cartegory = await addCartegory(data);
          res.status(httpstatus.CREATED).json({
               cartegory,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};

exports.getAllCartegories = async (req, res, next) => {
     try {
          const cartegories = await getCartegories();
          res.status(httpstatus.OK).json({
               cartegories,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};

exports.getSingleCartegory = async (req, res, next) => {
     try {
          const { id } = req.param;
          const cartegory = await getSingleCartegory(id);
          res.status(httpstatus.OK).json({
               cartegory,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};

exports.editCartegory = async(req,res,next)=>{
     try {
          const { id } = req.param;
          const data = req.body;
          const cartegory = await editCartegory(id,data);
          res.status(httpstatus.OK).json({
               cartegory,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
}
exports.removeCartegory = async (req,res,next)=>{
     try {
          const { id } = req.param;
          const cartegory = await removeCartegory(id);
          res.status(httpstatus.OK).json({
               cartegory,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
}