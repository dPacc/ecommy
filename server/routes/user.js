const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck } = require("../middlewares/auth");

//controllers
const { userCart, getUserCart, emptyCart } = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);

module.exports = router;
