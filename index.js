require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const session = require("express-session");
const User = require("./models/user");
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const attendanceRouter = require("./routes/attendance");
const trainingRouter = require("./routes/training");

const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/portal-plus")
  .then(() => {
    console.log("connect sucessfuly");
  })
  .catch((err) => {
    console.log("connect failed");
  });

const sessionConfig = {
  secret: "dkuafgsdfkugchvjsCSDCSDFAVFDhvkghghgfhfghfhIHCKN",
  resave: "false",
  saveUninitialized: "true",
  cookie: {
    httpOnly: true,
    expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(userRouter);
app.use(courseRouter);
app.use(attendanceRouter);
app.use(trainingRouter);

app.listen(5000);
