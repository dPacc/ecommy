const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// route controllers
const { upload, remove } = require("../controllers/cloudinary");

// routes
router.post("/uploadimages", authCheck, adminCheck, upload);
router.delete("/removeimage", authCheck, adminCheck, remove);

module.exports = router;
