const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    projectName: { type: String, required: true, trim: true, minlength: 3 },
    targetedArea: { type: String, required: true, trim: true, minlength: 3 },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
