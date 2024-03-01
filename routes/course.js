const express = require("express");
const Course = require("../models/course");
const isLogin = require("../middlewares/isLogin");
const Enrollment = require("../models/enrollment");

const router = express.Router();

router.post("/api/create_course", isLogin, (req, res) => {
  const { courseId, courseName, time, doctorName, location, major } = req.body;
  const course = new Course({
    courseId,
    courseName,
    time,
    doctorName,
    location,
    major,
  });
  course.save();
});

router.get("/test", (req, res) => {
  res.send(req.user);
});
router.post("/api/course_register", isLogin, async (req, res) => {
  const { courseId } = req.body;
  const course = await Course.findOne({ courseId });
  const enrollment = new Enrollment({
    user: req.user.id,
    course: course.id,
  });
  enrollment.save();
});
router.get("/api/get_courses", isLogin, async (req, res) => {
  const courses = await Course.find({ major: req.user.major });
  res.send(courses);
});

module.exports = router;
