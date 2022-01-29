const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User model
const User = require("../../models/User");

//  @route POST api/login
//  @desc authenticate user by choosing a user via entered email
// then comparing hash of this email.password with input field password
// @access public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  // Validation for fields
  if (!email || !password) {
    return res.status(400).json({ msg: "please input all fields" });
  }
  //  check existing user with email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    // if found user => compare hash of pw
    bcrypt.compare(password, user.password).then((isMatch) => {
      // isMatch is a boolean
      if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });
      // jwt signature to generate token if pw matched
      jwt.sign(
        {
          id: user.id,
        },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        //  returns a promise of token
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              fullName: user.fullName,
              email: user.email,
            },
          });
        }
      );
    });
  });
});
module.exports = router;
