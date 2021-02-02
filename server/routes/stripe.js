const express = require("express");
const router = express.Router();

const { createPaymentIntent } = require("../controllers/stripe");

// middlewares
const { authCheck } = require("../middlewares/auth");

// routes
router.post("/create-payment-intent", authCheck, createPaymentIntent);

module.exports = router;
