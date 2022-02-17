// Protected By aidAgencyAccess
// Accessed By Admin and Aidagency
const express = require('express');
const router = express.Router();
const { addVendor } = require('../controller/aidagency');
const { aidAgencyAccess } = require('../middleware/protectRouteMiddleware');

router.route('/add/vendor').post(aidAgencyAccess, addVendor);
module.exports = router;
