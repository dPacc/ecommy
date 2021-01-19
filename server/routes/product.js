const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// route controllers
const {
  create,
  read,
  update,
  remove,
  listAll,
  list,
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/product/:slug", read);
router.get("/products/:count", listAll);
router.put("/product/:slug", authCheck, adminCheck, update);
router.delete("/product/:slug", authCheck, adminCheck, remove);

router.post("/products", list);

module.exports = router;
