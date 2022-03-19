const express = require("express");
const router = express.Router();
const middlewares = require("../middleware/user");

const ingredients = require("./ingredients");
const recipes = require("./recipes");
const seasons = require("./seasons");
const signup = require("./signup");
const diets = require("./diets");
const types = require("./types");
const units = require("./units");
const users = require("./users");
const signin = require("./signin");

router.use("/ingredients", ingredients);
router.use("/recipes", recipes);
router.use("/seasons", seasons);
router.use("/signup", signup);
router.use("/diets", diets);
router.use("/types", types);
router.use("/units", units);
router.use("/users", users);
router.use("/account", middlewares.isLoggedIn, users);
router.use("/signin", signin);

module.exports = router;
