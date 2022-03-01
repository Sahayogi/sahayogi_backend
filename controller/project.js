const ErrorResponse = require('../utils/errorResponse');
const Project = require('../models/Project');

exports.createProject = async (req, res, next) => {
  console.log(req.user);
  const createdBy = req.user.username;
  console.log(req.body);

  const { projectName, targetedArea, description, beneficiaries } = req.body;
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

  try {
    const project = await Project.create({
      projectName,
      targetedArea,
      description,
      createdBy,
      beneficiaries: beneficiaryArray,
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
    res.status(400).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchFund = async (req, res, next) => {
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

exports.projectDetail = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return next(new ErrorResponse('Project Not Found', 404));
  }
};
// app.post("/imageupload", async (req, res) => {
//   try {
//     //projectavatar => name of our file input field in form
//     let upload = multer({ storage: storage }).single("projectavatar");
//     upload(req, res, function (err) {
//       //req.file contains info of uploaded file
//       //req.body contain info of text field
//       if (!req.file) {
//         return res.send("please select an image to upload");
//       } else if (err instanceof multer.MulterError) {
//         return res.send(err);
//       } else if (err) {
//         return res.send(err);
//       }
//     });
//   } catch (err) {}
// });
