// protected by registeredUserAccess
// accessed by all registered users.

const express = require('express');
const { home } = require('../controller/user');
const {
  registeredUserAccess,
} = require('../middleware/protectRouteMiddleware');
const router = express.Router();

router.route('/home').get(registeredUserAccess, home);
module.exports = router;
