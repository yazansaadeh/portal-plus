const express = require("express");
const User = require("../models/user");
const login = require("../middlewares/login");
const isLogin = require("../middlewares/isLogin");

const router = express.Router();

router.get("/create_user", async (req, res) => {
  const user = new User({
    rule: "doctor",
    major: "software",
    username: "50",
    name: " كريستيانو رونالدو ",
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

router.post("/api/storeOfficeHour", async (req, res) => {
  const { officeHour } = req.body;
  req.user.officeHour = officeHour;
  await req.user.save();
  res.send(req.user.officeHour);
});

router.post("/api/storeOfficeDay", async (req, res) => {
  const { officeDay } = req.body;
  req.user.officeDay = officeDay;
  await req.user.save();
  res.send(req.user.officeDay);
});

module.exports = router;
