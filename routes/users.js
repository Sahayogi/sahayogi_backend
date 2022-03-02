// protected by registeredUserAccess
// accessed by all registered users.

const express = require('express');
const { testProject } = require('../controller/project');
const {
  home,
  beneficiaryList,
  aidAgencyList,
  vendorList,
  bankList,
} = require('../controller/user');
const {
  registeredUserAccess,
} = require('../middleware/protectRouteMiddleware');

const router = express.Router();

router.route('/home').get(registeredUserAccess, home);
router.route('/beneficiaries').get(registeredUserAccess, beneficiaryList);
router.route('/aidagencies').get(registeredUserAccess, aidAgencyList);
router.route('/vendors').get(registeredUserAccess, vendorList);
router.route('/banks').get(registeredUserAccess, bankList);
router.route('/test').get(registeredUserAccess, testProject);
module.exports = router;
