const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  rule: {
    type: String,
    required: true,
  },
  course: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
