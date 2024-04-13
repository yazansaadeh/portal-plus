const express = require("express");
const Course = require("../models/course");
const isLogin = require("../middlewares/isLogin");
const Enrollment = require("../models/enrollment");
const Attendance = require("../models/attendance");

const router = express.Router();

router.post("/api/create_course", isLogin, async (req, res) => {
  const { courseId, courseName, time, doctorName, location, major } = req.body;
  const course1 = await Course.findOne({ courseId });
  const course2 = await Course.findOne({ courseName });
  if (course1) {
    return res.status(400).send({ error: "يجب تغيير رقم المادة" });
  } else if (course2) {
    return res.status(400).send({ error: "يجب تغيير إسم المادة" });
  }
  const course = new Course({
    courseId,
    courseName,
    time,
    doctorName,
    location,
    major,
  });
  course.save();
  res.send(course);
});

router.get("/test", (req, res) => {
  res.send(req.user);
});
router.post("/api/course_register", isLogin, async (req, res) => {
  const { courseId } = req.body;
  const course = await Course.findOne({ courseId });
  const userCourse = await Enrollment.find({ user: req.user.id })
    .populate("course")
    .exec();
  const repeatedCourse = userCourse.find((course) => {
    return course.id === courseId;
  });
  if (repeatedCourse) {
    return res.status(400).send({ error: "لا يوجد مادة بهذا الرقم" });
  } else if (course) {
    const enrollment = new Enrollment({
      user: req.user.id,
      course: course.id,
    });
    const savedEnrollment = await enrollment.save();
    const populatedEnrollment = await Enrollment.populate(savedEnrollment, {
      path: "course",
    });
    res.send(populatedEnrollment);
  } else {
    return res.status(401).send({ error: "لا يوجد مادة بهذا الرقم" });
  }
});
router.get("/api/get_courses", isLogin, async (req, res) => {
  const courses = await Course.find({ major: req.user.major });
  res.send(courses);
});

router.get("/api/get_user_course", isLogin, async (req, res) => {
  const userCourse = await Enrollment.find({ user: req.user.id })
    .populate("course")
    .exec();
  const attendance = await Attendance.find({
    userId: req.user.id,
    attend: false,
  });
  res.send({ userCourse, attendance });
});
router.post("/api/delete_course", isLogin, async (req, res) => {
  const { id } = req.body;

  try {
    // Find and delete the course by courseId
    const deletedCourse = await Enrollment.findOneAndDelete({
      user: req.user.id,
      course: id,
    });

    if (!deletedCourse) {
      return res.status(404).send({ error: "Course not found" });
    }

    res.send(deletedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
