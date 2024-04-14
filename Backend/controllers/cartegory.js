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

exports.register_cartegory = async (req, res, next) => {
     try {
          const data = req.body;
          const category = await addCartegory(data);
          res.status(httpstatus.CREATED).json({
               category,
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
          const cartegory = await getSingleCartegory(req.params.id);
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
          const cartegory = await editCartegory(req.params.id,req.body);
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