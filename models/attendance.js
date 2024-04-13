const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  attend: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
