const express = require("express");
const Deals = require("../models/DealsSchema");
const router = express.Router();
const uuid = require("uuid");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//* Add a deal
router.post("/", upload.single("img"), (req, res) => {
  const newSubmission = req.body;
  const newImage = req.file;
  // console.log("newImage", newImage, "newSubmission", newSubmission);

  // multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, "uploads");
  //   },
  //   filename: (req, file, cb) => {
  //     const { originalname } = file;
  //     cb(null, `${uuid()} - ${originalname} `);
  //   },
  // });

  console.log("newSubmission", newSubmission);
  Deals.create(newSubmission, (error, submission) => {
    if (error) {
      res.status(500).send({ error });
    } else {
      res.status(201).send(submission);
    }
  });
});
module.exports = router;
