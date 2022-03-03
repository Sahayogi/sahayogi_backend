const ErrorResponse = require('../utils/errorResponse');
const Project = require('../models/Project');
const User = require('../models/User');

exports.createProject = async (req, res, next) => {
  console.log(req.user);
  console.log(req.body);
  const createdBy = req.user.username;
  console.log(req.body);
  console.log('CreateProject Data Up');

  const {
    projectName,
    targetedArea,
    description,
    beneficiaries,
    relateProjId,
  } = req.body;
  if (!projectName || !targetedArea || !description) {
    next(new ErrorResponse('Please input all field', 400));
  }
  const beneficiaryArray = [];
  // list of string separated by commas is added as array to model
  // console.log(beneficiaries.split(','));
  if (beneficiaries) {
    beneficiaries.split(',').map((beneficiary) => {
      beneficiaryArray.push(beneficiary.trim());
    });
    console.log(beneficiaryArray.length);
  }
  const relateBlockProj = parseInt(relateProjId);

  try {
    const project = await Project.create({
      projectName,
      targetedArea,
      description,
      createdBy,
      beneficiaries: beneficiaryArray,
      relateBlockProj,
    });
    return res.status(200).json({
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
    project,
  });
};

exports.deleteProject = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'Project added Successfully',
  });
};

exports.projects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchFund = async (req, res, next) => {
  // ProjId is related to blockchain
  const { goal, start, end } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    project.goal = goal;
    project.start = start;
    project.end = end;
    await project.save();
  } catch (error) {
    next(error);
  }
};

const getWallEmail = async (beneficiaries) => {
  const walletEmail = [];
  await beneficiaries.map(async (beneficiary) => {
    const user = await User.findOne({ email: beneficiary });
    // if (user) {
    //   console.log('User exitst');
    //   walletEmail.push({ beneficiary, wallet: user.walletAddress });
    // } else {
    //   walletEmail.push({
    //     beneficiary: 'user Not Found',
    //     wallet: 'Not FOund',
    //   });
    // }
    walletEmail.push(user);
  });
  console.log(walletEmail);
  return walletEmail;
};

exports.projectDetail = async (req, res, next) => {
  console.log(`id passed from front end`, req.params.id);

  try {
    const project = await Project.findById(req.params.id);
    const {
      beneficiaries,
      projectName,
      targetedArea,
      description,
      createdBy,
      collectedToken,
    } = project;
    const users = await User.find({ email: { $in: beneficiaries } });
    const data = {
      users,
      projectName,
      targetedArea,
      description,
      collectedToken,
      createdBy,
    };

    res.status(200).json({
      success: true,
      data: data,
    });
    // res.status(200).json({
    //   success: true,
    //   data: project,
    // });
  } catch (error) {
    return next(new ErrorResponse('Project Not Found', 404));
  }
};

exports.testProject = async (req, res, next) => {
  const myList = ['agency11@gmail.com', 'agency2@gmail.com'];
  const users = await User.find({ email: { $in: myList } });
  res.status(200).json({
    success: true,
    data: 'Hello World',
    users,
  });
};
