const express = require("express");
const User = require("../models/user");
const login = require("../middlewares/login");
const isLogin = require("../middlewares/isLogin");

const router = express.Router();

router.get("/create_user", async (req, res) => {
  const user = new User({
    rule: "student",
    major: "software",
    username: "10",
    name: "عمر ابو كركي",
  });
  const newUser = await User.register(user, "44");
  res.send(newUser);
});

router.post("/api/login", login, (req, res, next) => {});

router.get("/api/get_name", isLogin, (req, res) => {
  if (req.user.name) {
    res.send({ name: req.user.name, id: req.user.username });
  } else {
    res.send("There is no name");
  }
});

router.get("/api/isLogin", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(true);
  }
  res.send(false);
});

router.get("/api/get_rule", isLogin, (req, res) => {
  const rule = req.user.rule || "";
  res.send(rule);
});

router.get("/api/logout", (req, res) => {
  // Passport.js provides a `logout()` function to clear the login session
  req.logout(() => {
    res.send("logged out successfuly");
  });
});

module.exports = router;
