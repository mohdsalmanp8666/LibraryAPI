const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const reIssueBookController = require("../controllers/reIssueBookController");
const router = express.Router();

router.put("/", verifyToken, reIssueBookController);

module.exports = router;
