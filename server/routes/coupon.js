const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const { create, list, remove } = require("../controllers/coupon");

// routes
router.post("/coupon", authCheck, adminCheck, create);
router.get("/coupons", list);
router.delete("/coupon/:couponId", authCheck, adminCheck, remove);

module.exports = router;
