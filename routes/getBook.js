const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const getBookController = require("../controllers/getBookController");

router.get("/", verifyToken, getBookController);

module.exports = router;
