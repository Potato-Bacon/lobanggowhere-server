require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Category = require("./models/CategorySchema");

//configuration
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI ?? "";
mongoose.connect(MONGO_URI);
mongoose.connection.once("open", () => {
  console.log(`connected to mongo at ${MONGO_URI}`);
});

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.get("/category/seed", async (req, res) => {
  const newCategories = [
    { classification: "Groceries" },
    { classification: "Food" },
    { classification: "Event" },
    { classification: "Course" },
    { classification: "Travel" },
    { classification: "Lifestyle" },
    { classification: "Household" },
    { classification: "Beauty" },
  ];

  await Category.deleteMany();

  Category.create(newCategories, (error, categories) => {
    if (error) {
      res.status(500).send({ error });
    } else {
      res.status(201).send(categories);
    }
  });
});
app.get("/", (req, res) => {
  res.send({ test: "hi route" });
});

app.post("/submission", (req, res) => {
  res.send({ submit: "submission" });
});

app.get("/deals/:id", (req, res) => {
  res.send({ deals: "individual" });
});

app.get("/events/:id", (req, res) => {
  res.send({ events: "individual" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express listing on ${PORT}`);
});
