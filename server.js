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

//? Do not copy whole objects in for post/put - only the required fields (to prevent unauthorized editing of data)


//* Test / Homepage - show popular deals default
app.get("/", (req, res) => {
  res.send({ test: "hi route" });
});

//* Add a deal
app.post("/submission", (req, res) => {
  res.send({ submit: "submission" });
});

//* Login - get JWT token & refresh token etc
app.get("/login", (req, res) => {
  res.send({ deals: "individual" });
});

//* Search for deals by id
app.get("/deals/:id", (req, res) => {
  res.send({ deals: "individual" });
});

//* Search for deals by search category
app.get("/category", (req, res) => {
  res.send({ deals: "individual" });
});

//* Search for deals by name (query?)
app.get("/search/:id", (req, res) => {
  res.send({ deals: "individual" });
});

//* Show personal account details
app.get("/account", (req, res) => {
  res.send({ users: "individual" });
});

//* Change account password (or other details maybe?) by id
app.put("/account/:id", (req, res) => {
  res.send({ users: "individual" });
});

//* Delete account by id
app.delete("/account/:id", (req, res) => {
  res.send({ users: "individual" });
});

//* Search for user by id
app.get("/account/:id", (req, res) => {
  res.send({ users: "individual" });
});

//*  Register User
app.post("/register", (req, res) => {
  res.send({ users: "individual" });
});

//* Admin page (secret page) - Verify admin on user in database
app.get("/admin", (req, res) => {
  res.send({ users: "individual" });
});

//* User edit post by id (verify user is owner)
app.put("/deals/:id", (req, res) => {
  res.send({ users: "individual" });
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express listing on ${PORT}`);
});
