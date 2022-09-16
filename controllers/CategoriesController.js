const express = require("express");
const router = express.Router();

//* Search for deals by search category
//? No auth req
router.get("/", (req, res) => {
  res.send({ deals: "individual" });
});

module.exports = router;
