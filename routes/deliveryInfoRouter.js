const router = require("express").Router();
const deliveryInfoController = require("../controllers/deliveryInfo");
const {isLogin, isAdmin} = require("../middleware/require");

router.post("/saveDeliveryInfo",isLogin,deliveryInfoController.saveDeliveryInfo);
router.get("/getDeliveryInfo",isLogin,deliveryInfoController.getDeliveryInfo);
router.post("/particularUserDelivery",isLogin,isAdmin,deliveryInfoController.getDeliveryInfoForParticularUser)

module.exports = router;