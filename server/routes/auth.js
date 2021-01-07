const express = require("express");

const router = express.Router();
const { createOrUpdateUser } = require("../controllers/auth");

router.get("/auth/createOrUpdateUser", createOrUpdateUser);

module.exports = router;
