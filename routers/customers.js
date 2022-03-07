const express = require("express");
const router = express.Router();
const customers_controller = require("../controllers/customer_controller");

router.post("/login" , customers_controller.signIn);
router.post("/signup" , customers_controller.signUp);

module.exports = router;
