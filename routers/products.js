const express = require("express");
const router = express.Router();
const products_controller = require("../controllers/product_controller")  
const auth = require("../middleware/auth");

router.get("/", products_controller.getAllProducts);
router.post("/", auth.authSeller , products_controller.createProduct);
module.exports = router;
