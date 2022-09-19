require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const Deals = require("./models/DealsSchema");
const Category = require("./models/CategorySchema");
const accountsController = require("./controllers/AccountsController");
const adminsController = require("./controllers/AdminsController");
const categoriesController = require("./controllers/CategoriesController");
const dealsController = require("./controllers/DealsController");
const loginController = require("./controllers/LoginController");
const registerController = require("./controllers/RegisterController");
const searchesController = require("./controllers/SearchesController");
const submissionsController = require("./controllers/SubmissionsController");
const handleRefreshToken = require("./controllers/handleRefreshToken");

//configuration
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI ?? "";
mongoose.connect(MONGO_URI);
mongoose.connection.once("open", () => {
  console.log(`connected to mongo at ${MONGO_URI}`);
});

const app = express();

//middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use("/account", accountsController);
app.use("/admin", adminsController);
app.use("/category", categoriesController);
app.use("/deals", dealsController);
app.use("/login", loginController);
app.use("/register", registerController);
app.use("/search", searchesController);
app.use("/submission", submissionsController);
app.use("/refresh", handleRefreshToken);

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
app.get("/", async (req, res) => {
  try {
    const allDeals = await Deals.find();
    res.status(201).send(allDeals);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express listing on ${PORT}`);
});
