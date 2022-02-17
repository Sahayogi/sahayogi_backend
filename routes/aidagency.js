// Protected By aidAgencyAccess
// Accessed By Admin and Aidagency
const express = require('express');
const router = express.Router();
const {
  addVendor,
  addBank,
  addBeneficiary,
} = require('../controller/aidagency');
const { aidAgencyAccess } = require('../middleware/protectRouteMiddleware');

router.route('/add/vendor').post(aidAgencyAccess, addVendor);
router.route('/add/bank').post(aidAgencyAccess, addBank);
router.route('/add/beneficiary').post(aidAgencyAccess, addBeneficiary);
module.exports = router;
