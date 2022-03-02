const express = require('express');
const router = express.Router();
const { updateWallet } = require('../controller/wallet');
const {
  registeredUserAccess,
} = require('../middleware/protectRouteMiddleware');

router.route('/connected').post(registeredUserAccess, updateWallet);
module.exports = router;
