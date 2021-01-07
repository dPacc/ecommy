const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

router.post("/createOrUpdateUser", authCheck, createOrUpdateUser);
router.post("/currentUser", authCheck, currentUser);

module.exports = router;
