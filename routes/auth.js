const express = require('express');
const router = express.Router();
const { login, adminRegister } = require('../controller/auth');
// One time admin registration comment it after
router.route('/adminregister').post(adminRegister);
router.route('/login').post(login);

module.exports = router;
