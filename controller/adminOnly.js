const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Project = require('../models/Project');
const { mongo } = require('mongoose');

exports.addAidAgency = async (req, res, next) => {
  console.log(req.user);
  const { username, email, password, address, phoneNumber } = req.body;

  if (!username || !email || !password) {
    return next(new ErrorResponse('Please Input all field', 400));
  }
  const typeOfUser = 'AidAgency';
  try {
    const user = await User.create({
      username,
      email,
      password,
      address,
      phoneNumber,
      typeOfUser,
    });
    res.status(200).json({
      success: true,
      data: 'aidAgency added',
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.mapProject = async (req, res, next) => {
  const { projectId, mongoId, goal, start, end } = req.body;
  // ProjectId here is blockchain project id
  const parsedGoal = parseInt(goal);
  console.log(parsedGoal);
  const parsedBlockNumber = parseInt(projectId);
  try {
    const project = await Project.findById(mongoId);
    if (project) {
      project.goal = parsedGoal;
      project.projectBlockId = parsedBlockNumber;
      project.start = start;
      project.end = end;
      await project.save();
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};
