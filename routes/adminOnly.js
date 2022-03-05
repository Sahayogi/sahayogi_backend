// Protected by adminOnlyAccess
// Accessed by admin
const express = require('express');
const { adminOnlyAccess } = require('../middleware/protectRouteMiddleware');
const {
  addAidAgency,
  mapProject,
  addAgencyToBlock,
} = require('../controller/adminOnly');
const router = express.Router();
router.route('/add/aidagency').post(adminOnlyAccess, addAidAgency);
router.route('/project/map').post(adminOnlyAccess, mapProject);
router.route('/agency/addtoblock').post(adminOnlyAccess, addAgencyToBlock);
module.exports = router;
