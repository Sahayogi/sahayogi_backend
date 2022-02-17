// protected by registeredUserAccess
// accessed by all registered users.

const express = require('express');
const {
  home,
  benefiaryList,
  aidAgencyList,
  vendorList,
  bankList,
} = require('../controller/user');
const {
  registeredUserAccess,
} = require('../middleware/protectRouteMiddleware');
const router = express.Router();

router.route('/home').get(registeredUserAccess, home);
router.route('/beneficiaries').get(registeredUserAccess, benefiaryList);
router.route('/aidagencies').get(registeredUserAccess, aidAgencyList);
router.route('/vendors').get(registeredUserAccess, vendorList);
router.route('/banks').get(registeredUserAccess, bankList);
module.exports = router;
