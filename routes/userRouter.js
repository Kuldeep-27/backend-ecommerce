const router = require("express").Router();
const userController = require("../controllers/userController");
const {isLogin} =  require("../middleware/require");


router.get("/userInfo",isLogin,userController.getUserInfo);

module.exports = router;

