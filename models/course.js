const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  courseName: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
