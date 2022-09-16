const express = require("express");
const router = express.Router();

//* Admin page (secret page) - Verify admin on user in database
router.get("/", (req, res) => {
  res.send({ users: "individual" });
});

module.exports = router;
