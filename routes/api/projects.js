const router = require("express").Router();
let Project = require("../../models/project.model");

router.route("/").get((req, res) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const projectName = req.body.projectName;
  const targetedArea = req.body.targetedArea;
  const description = req.body.description;
  const newProject = new Project({
    projectName,
    targetedArea,
    description,
  });
  newProject
    .save()
    .then(() => res.json("Project Added Successfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json("project deleted successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Project.findById(req.params.id)
    .then((project) => {
      project.projectName = req.body.projectName;
      project.targetedArea = req.body.targetedArea;
      project.description = req.body.description;
      project
        .save()
        .then(() => res.json("Project Updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
