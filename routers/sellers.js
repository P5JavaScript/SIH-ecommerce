const express = require("express");
const router = express.Router();
const sellers_controller = require("../controllers/sellers_controller");

router.post("/signup", sellers_controller.signUp);
router.post("/login", sellers_controller.signIn);

module.exports = router;
