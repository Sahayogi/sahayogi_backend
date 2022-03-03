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
  console.log(req.body);
  const { project, goal, start, end, fundingCount } = req.body;
  // ProjectId here is blockchain project id
  const updatedFrCount = parseInt(fundingCount);
  const parsedGoal = parseInt(goal);
  const updatedProjId = parseInt(project);
  console.log(typeof updatedProjId);
  try {
    const project = await Project.findOne({
      relateBlockProj: updatedProjId,
    });
    if (project) {
      project.goal = parsedGoal;
      project.start = start;
      project.end = end;
      project.frCount = updatedFrCount;
      console.log(project);
      await project.save();
      res.status(200).json({
        success: true,
        data: 'project',
      });
    } else {
      next(new ErrorResponse('No Project Found', 404));
    }
  } catch (error) {
    next(error);
  }
};
