// Project create read update delete
// Create, Update, delete => aidAgency
// Read => User
const express = require('express');

const {
  createProject,
  updateProject,
  deleteProject,
  projectDetail,
  fetchFund,
} = require('../controller/project');
const {
  aidAgencyAccess,
  registeredUserAccess,
} = require('../middleware/protectRouteMiddleware');
const router = express.Router();
router.route('/projects').get(registeredUserAccess, updateProject);
router.route('/fetch/:id').get(registeredUserAccess, fetchFund);
router.route('/:id').get(registeredUserAccess, projectDetail);
router.route('/add').post(aidAgencyAccess, createProject);
router.route('/update/:id').put(aidAgencyAccess, updateProject);
router.route('/delete/:id').delete(aidAgencyAccess, deleteProject);
module.exports = router;
