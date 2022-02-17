// Protected by adminOnlyAccess
// Accessed by admin
const express = require('express');
const { adminOnlyAccess } = require('../middleware/protectRouteMiddleware');
const { addAidAgency } = require('../controller/adminOnly');
const router = express.Router();
router.route('/add/aidagency').post(adminOnlyAccess, addAidAgency);
module.exports = router;
