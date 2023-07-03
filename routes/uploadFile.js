const express = require("express");
const uploadFileController = require("../controllers/uploadFileController");
const router = express.Router();

router.post("/", uploadFileController);

module.exports = router;
