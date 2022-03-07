const express = require("express");
const router = express.Router();

router.use("/sellers", require("./sellers"));
router.use("/customers", require("./customers"));

module.exports = router;
