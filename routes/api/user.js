const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

//  @route POST api/users
// @route Register new user
//  @access public
router.post("/", (req, res) => {
  const { fullName, email, password } = req.body;
  //  Validation
  if (!fullName || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check existing user
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({
      fullName,
      email,
      password,
    });
    // create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            {
              id: user.id,
            },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
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
  });
});
module.exports = router;
