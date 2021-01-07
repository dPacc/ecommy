const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.send("You hit the user API");
});

module.exports = router;
