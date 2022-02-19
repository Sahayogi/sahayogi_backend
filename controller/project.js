const errorResponse = require("../utils/errorResponse");
const Project = require("../models/Project");


exports.createProject = async (req, res, next) => {
  console.log(req.user);
  const createdBy = req.user.username;
  const { projectName, targetedArea, description } = req.body;
  if (!projectName || !targetedArea || !description) {
    next(new errorResponse("Please input all field", 400));
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
      data: "Project added Successfully",
      project,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProject = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "Project added Successfully",
  });
};

exports.deleteProject = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "Project added Successfully",
  });
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
