const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.username = req.body.username;
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};
