const express = require("express");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const Attendance = require("../models/attendance");
const Enrollment = require("../models/enrollment");
const Course = require("../models/course");

const router = express.Router();

let uniq;
router.post("/api/generateQRCode", async (req, res) => {
  const { courseId } = req.body;
  const course = await Course.findOne({ courseId });
  if (course.doctorName === req.user.name) {
    const generateQR = async (text) => {
      try {
        const values = { text: text, uniqText: uuidv4() };
        uniq = values.uniqText;
        const qrDataUrl = await QRCode.toDataURL(JSON.stringify(values));
        res.send(qrDataUrl);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error generating QR code");
      }
    };
    await generateQR(courseId);
  } else {
    res.status(401).send({ error: "يجب عليك ان تكون مدرس في هذه المادة" });
  }
});
router.post("/api/takeAttendance", async (req, res) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate(); // Get the day (1-31)
  const currentMonth = currentDate.getMonth() + 1; // Get the month (0-11), add 1 to make it (1-12)
  const currentYear = currentDate.getFullYear(); // Get the year (e.g., 2024)
  const { courseId } = req.body;
  const course = await Course.findOne({ courseId });
  if (course.doctorName === req.user.name) {
    const enrollment = await Enrollment.find({ course: course._id })
      .populate("user")
      .exec();
    enrollment.map((student) => {
      const attendance = new Attendance({
        courseId: courseId,
        userId: student.user._id,
        attend: false,
        date: `${currentYear}-${currentMonth}-${currentDay}`,
      });
      attendance.save();
    });
  }
});
router.post("/api/scanQRCode", async (req, res) => {
  const { text, uniqText, day, month, year } = req.body;
  console.log(uniq);
  console.log(uniqText);
  if (uniqText === uniq) {
    const date = `${year}-${month}-${day}`;
    console.log(date);
    // const studentAttend = await Attendance.findOne({ userId: req.user.id, date: currentDate });
    const updateStudentAttend = await Attendance.findOneAndUpdate(
      {
        courseId: text,
        userId: req.user.id,
        attend: false,
        date,
      },
      { attend: true }, // Update the `attend` field to true
      { new: true } // Return the modified document
    );
  } else {
    res.status(500).send("QR code is old");
  }
});

module.exports = router;
