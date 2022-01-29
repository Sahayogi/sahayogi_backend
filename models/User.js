const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  Create Schema
const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "beneficiary",
  },
});

module.exports = User = mongoose.model("user", UserSchema);
