const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainingFileSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  studentMajor: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  fileStatus: {
    type: String,
    default: "null",
  },
  showInDoctorPage: {
    type: Boolean,
    default: true,
  },
  showInStudentPage: {
    type: Boolean,
    default: true,
  },
  declineText: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Training", trainingFileSchema);
