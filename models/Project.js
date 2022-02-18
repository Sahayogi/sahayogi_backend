const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, 'Please Provide Project Name'],
      trim: true,
      minlength: 3,
    },
    targetedArea: {
      type: String,
      required: [true, 'Please Provide targer area of project eg: Landslide'],
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      trim: true,
      minlength: 3,
    },
    collectedToken: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
