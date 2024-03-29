// Protected By aidAgencyAccess
// Accessed By Admin and Aidagency
const express = require('express');
const router = express.Router();
const {
  addVendor,
  addBank,
  addBeneficiary,
  updateStatus,
  claimProject,
  getChart,
} = require('../controller/aidagency');
const { aidAgencyAccess } = require('../middleware/protectRouteMiddleware');

router.route('/add/vendor').post(aidAgencyAccess, addVendor);
router.route('/add/bank').post(aidAgencyAccess, addBank);
router.route('/add/beneficiary').post(aidAgencyAccess, addBeneficiary);
router.route('/status/:id').put(aidAgencyAccess, updateStatus);
router.route('/claim/').post(aidAgencyAccess, claimProject);
router.route('/chart').get(aidAgencyAccess, getChart);
module.exports = router;
