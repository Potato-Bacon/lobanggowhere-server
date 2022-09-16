const express = require("express");
const router = express.Router();

//*  Register User
//? No Auth required - Remember to not copy entire object!
router.post("/", (req, res) => {
  res.send({ users: "individual" });
});

module.exports = router;
