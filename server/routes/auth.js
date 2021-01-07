const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const { createOrUpdateUser } = require("../controllers/auth");

router.post("/createOrUpdateUser", authCheck, createOrUpdateUser);

module.exports = router;
