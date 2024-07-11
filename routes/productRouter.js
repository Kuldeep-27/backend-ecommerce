const router = require("express").Router();
const productController = require("../controllers/productController");
const {isLogin,isAdmin} = require("../middleware/require");

router.post("/addNewProduct",isLogin,isAdmin,productController.addNewProduct);
router.get("/latestProduct",productController.latestProduct);
router.get("/allProducts",productController.allProducts);
router.post("/updateProduct",isLogin,isAdmin,productController.updateProduct);
router.post("/delete",isLogin,isAdmin,productController.deleteProduct);
router.post("/getProductInfo",productController.getProductInfo);
router.post("/searchProduct",productController.searchProduct);

module.exports = router;

