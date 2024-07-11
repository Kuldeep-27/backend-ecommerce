const router = require("express").Router();
const cartController = require("../controllers/cartController");
const {isLogin,isAdmin} = require("../middleware/require");

router.post("/addToCart",isLogin,cartController.addToCart);
router.get("/getCartItems",isLogin,cartController.getCartItems);
router.post("/removeFromCart",isLogin,cartController.removeFromCart);
router.post("/incrementQuantity",isLogin,cartController.incrementQuantity);
router.post("/decrementQuantity",isLogin,cartController.decrementQuantity);

module.exports = router;