const express = require("express");
const router = express.Router();

//* Add a deal
router.post("/", (req, res) => {
  res.send({ submit: "submission" });
});
module.exports = router;
