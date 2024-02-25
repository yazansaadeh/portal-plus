const express = require("express");
const passport = require("passport");
const User = require("../models/user");

const router = express.Router();

router.get("/create_user", async (req, res) => {
  const user = new User({
    rule: "doctor",
    username: "222",
  });
  const newUser = await User.register(user, "222");
  res.send(newUser);
});

router.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or passworddffdfdf" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

module.exports = router;
