const User = require('../models/User');
const Project = require('../models/Project');
const ErrorResponse = require('../utils/errorResponse');

exports.addVendor = async (req, res, next) => {
  const access_user = req.user;
  const { username, email, password, address, phoneNumber } = req.body;
  if (!username || !email || !password) {
    return next(new ErrorResponse('Please Input all field', 400));
  }
  const typeOfUser = 'Vendor';
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
      data: 'Vendor Added',
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.addBank = async (req, res, next) => {
  const access_user = req.user;
  const { username, email, password, address, phoneNumber } = req.body;
  if (!username || !email || !password) {
    return next(new ErrorResponse('Please Input all field', 400));
  }
  const typeOfUser = 'Bank';
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
      data: 'Bank added',
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.addBeneficiary = async (req, res, next) => {
  const access_user = req.user;
  const { username, email, password, address, phoneNumber } = req.body;
  if (!username || !email || !password) {
    return next(new ErrorResponse('Please Input all field', 400));
  }
  try {
    const user = await User.create({
      username,
      email,
      password,
      address,
      phoneNumber,
    });
    res.status(200).json({
      success: true,
      data: 'Beneficiary added',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Change status
exports.updateStatus = async (req, res, next) => {
  console.log('update status');
  console.log(req.params.id);
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return new ErrorResponse('No User Found', 404);
    }
    const status = user.status;
    console.log(user);
    console.log(status);
    user.status = !status;
    await user.save();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
exports.claimProject = async (req, res, next) => {
  const { projectId } = req.body;
  console.log(projectId);
  try {
    const project = await Project.findById(projectId);
    console.log(project);
    project.claimed = true;
    project.save();
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

exports.getChart = async (req, res, next) => {
  try {
    const projects = (
      await Project.find().sort('-goal').select('projectName').select('goal')
    ).splice(0, 5);
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};
