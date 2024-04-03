const CustomError = require("../utils/customErrorClass");
const httpstatus = require("../utils/httpstatus");
const logger = require("../utils/loggerUtil");

const {
     addFood,
     getFoods,
     editfood,
     removeFood,
     getSingleFood,
} = require("../helpers/recipe");

exports.saveRecipe = async (req, res, next) => {
     try {
          const data = req.body;
          const recipe = await addFood(data);
          res.status(httpstatus.CREATED).json({
               recipe,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};
exports.getRecipes = async (req, res, next) => {
     try {
          const recipes = await getFoods();
          res.status(httpstatus.OK).json({
               recipes,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};
exports.editRecipe = async (req, res, next) => {
     try {
          const data = req.body;
          const id = req.params.id;
          const recipe = await editfood(id, data);
          res.status(httpstatus.OK).json({
               recipe,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};
exports.deleteRecipe = async (req, res, next) => {
     try {
          const id = req.params.id;
          const recipe = await removeFood(id);
          res.status(httpstatus.OK).json({
               recipe,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};

exports.getSingleRecipie = async (req, res, next) => {
     try {
          const { id } = req.params;
          const recipe = await getSingleFood(id);
          res.status(httpstatus.OK).json({
               recipe,
          });
     } catch (error) {
          logger.error(error);
          next(new CustomError(500, error));
     }
};
