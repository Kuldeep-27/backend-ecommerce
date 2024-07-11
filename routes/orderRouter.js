const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { isLogin, isAdmin } = require("../middleware/require");

router.post("/createOrder",isLogin,orderController.createOrder);
router.get("/getOrders",isLogin,orderController.getUserOrders);
router.get("/getAllOrders",isLogin,isAdmin,orderController.getAllOrders);
router.post("/getParticularOrder",isLogin,isAdmin,orderController.getParticularOrder);
router.post("/changeStatus",isLogin,isAdmin,orderController.changeStatus);
router.get("/getMyOrders",isLogin,orderController.getMyOrders);
router.post("/getMyParticularOrder",isLogin,orderController.getMyParticularOrder);

module.exports = router;