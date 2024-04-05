const { Router } = require("express");
const router = Router();
const delivery = require("../../../controllers/delivery");

router.post("/", delivery.saveDeliveryInfo);
router.get("/", delivery.getDeliveries);
router.get("/:id", delivery.getSingleDelivery);
router.patch("/:id", delivery.edit_delivery);
router.delete("/:id", delivery.deleteDelivery);
router.get("/:clientId", delivery.get_delivery_info_by_clientId);

module.exports = router;
