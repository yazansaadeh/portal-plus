const express = require("express");
const User = require("../models/user");
const login = require("../middlewares/login");
const isLogin = require("../middlewares/isLogin");

const router = express.Router();

router.get("/create_user", async (req, res) => {
  const user = new User({
    rule: "doctor",
    major: "BIT",
    username: "44",
  });
  const newUser = await User.register(user, "44");
  res.send(newUser);
});

router.post("/api/login", login, (req, res, next) => {});

module.exports = router;
