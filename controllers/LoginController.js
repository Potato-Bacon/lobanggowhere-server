const express = require("express");
const router = express.Router();

//* Login - get JWT token & refresh token etc
router.get("/", (req, res) => {
  res.send({ deals: "individual" });
});

module.exports = router;
