const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const {
  create,
  read,
  update,
  list,
  remove,
} = require("../controllers/subcategory");

// routes
router.post("/subcategory", authCheck, adminCheck, create);
router.get("/subcategories", list);
router.get("/subcategory/:slug", read);
router.put("/subcategory/:slug", authCheck, adminCheck, update);
router.delete("/subcategory/:slug", authCheck, adminCheck, remove);

module.exports = router;
