const express = require("express");
const User = require("../models/user");
const login = require("../middlewares/login");
const isLogin = require("../middlewares/isLogin");

const router = express.Router();

router.get("/create_user", isLogin, async (req, res) => {
  const user = new User({
    rule: "doctor",
    username: "34235653452",
  });
  const newUser = await User.register(user, "222");
  res.send(newUser);
});

router.post("/api/login", login, (req, res, next) => {});

module.exports = router;
