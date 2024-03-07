const express = require("express");
const User = require("../models/user");
const login = require("../middlewares/login");
const isLogin = require("../middlewares/isLogin");

const router = express.Router();

router.get("/create_user", async (req, res) => {
  const user = new User({
    rule: "doctor",
    major: "CS",
    username: "66",
    name: "عبادة سالم معيوف السوالمة",
  });
  const newUser = await User.register(user, "44");
  res.send(newUser);
});

router.post("/api/login", login, (req, res, next) => {});

router.get("/api/get_name", isLogin, (req, res) => {
  if (req.user.name) {
    res.send(req.user.name);
  } else {
    res.send("There is no name");
  }
});

module.exports = router;
