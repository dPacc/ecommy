const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck } = require("../middlewares/auth");

//controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

module.exports = router;
