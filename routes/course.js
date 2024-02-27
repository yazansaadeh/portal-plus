const express = require("express");
const Course = require("../models/course");
const isLogin = require("../middlewares/isLogin");

const router = express.Router();

router.post("/api/create_course", isLogin, (req, res) => {
  const { courseId, courseName, time, doctorName, location } = req.body;
  const course = new Course({
    courseId,
    courseName,
    time,
    doctorName,
    location,
  });
  course.save();
});

module.exports = router;
