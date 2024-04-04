const { Router } = require("express");
const router = Router();
const cartegory = require("../../../controllers/cartegory");

router.post("/", cartegory.regiter_cartegory);
router.get("/", cartegory.getAllCartegories);
router.get("/:id", cartegory.getSingleCartegory);
router.patch("/:id", cartegory.editCartegory);
router.delete("/:id", cartegory.removeCartegory);

module.exports = router;
