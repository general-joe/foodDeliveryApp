const express = require("express");
const router = express.Router();
const recipe = require("../../../controllers/recipe");

router.post("/", recipe.saveRecipe);
router.get("/", recipe.getRecipes);
router.get("/:id", recipe.getSingleRecipie);
router.patch("/:id", recipe.editRecipe);
router.delete("/:id", recipe.deleteRecipe);

module.exports = router;
