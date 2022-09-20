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
const handleAuthCheck = require("./controllers/handleAuthCheck");
const cookieParser = require("cookie-parser");
const User = require("./models/UserSchema");

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
app.use(cookieParser());

app.use("/account", accountsController);
app.use("/admin", adminsController);
app.use("/category", categoriesController);
app.use("/deals", dealsController);
app.use("/login", loginController);
app.use("/register", registerController);
app.use("/search", searchesController);
app.use("/submission", submissionsController);
app.use("/refresh", handleRefreshToken);
app.use("/authcheck", handleAuthCheck);

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
    const allDeals = await Deals.find({ submittedStatus: "Approve" });
    res.status(201).send(allDeals);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const searchDeal = await Deals.find({
      title: { $regex: id, $options: "i" },

      submittedStatus: "Approve",
    });
    res.status(201).send(searchDeal);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/profile/:username", async (req, res) => {
  const { username } = req.params;
  console.log(username, "test");
  try {
    const publicProfile = await Deals.find(
      {
        submittedBy: username,
        submittedStatus: "Approve",
      },
      { img: 1, title: 1, submittedBy: 1 }
    );
    res.status(201).send(publicProfile);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Express listing on ${PORT}`);
});
