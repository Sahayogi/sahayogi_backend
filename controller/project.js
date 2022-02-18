const errorResponse = require('../utils/errorResponse');
const Project = require('../models/Project');

exports.createProject = async (req, res, next) => {
  console.log(req.user);
  const createdBy = req.user.username;
  const { projectName, targetedArea, description } = req.body;
  if (!projectName || !targetedArea || !description) {
    next(new errorResponse('Please input all field', 400));
  }
  try {
    const project = await Project.create({
      projectName,
      targetedArea,
      description,
      createdBy,
    });
    res.status(200).json({
      success: true,
      data: 'Project added Successfully',
      project,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProject = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'Project added Successfully',
  });
};

exports.deleteProject = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'Project added Successfully',
  });
};
