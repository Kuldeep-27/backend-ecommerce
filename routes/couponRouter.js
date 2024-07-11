const router = require('express').Router();
const couponController = require("../controllers/couponController");
const {isLogin,isAdmin} = require("../middleware/require");

router.post("/saveCoupon",isLogin,isAdmin,couponController.saveCoupon);
router.get("/allCoupons",isLogin,isAdmin,couponController.getAllCoupons);
router.post("/delete",isLogin,isAdmin,couponController.deleteCoupon);
router.post("/checkValid",isLogin,couponController.checkCoupon);

module.exports = router;



