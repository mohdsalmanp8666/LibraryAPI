const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const collectBookController = require("../controllers/collectBookController");
const router = express.Router();

router.put("/", verifyToken, collectBookController);

module.exports = router;
