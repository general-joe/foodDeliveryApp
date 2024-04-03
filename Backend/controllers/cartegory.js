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

