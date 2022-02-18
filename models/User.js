const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//  Create Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please provide a username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please Provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, `Please add a password`],
    minlength: 6,
    select: false,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
  walletAddress: String,
  location: String,
  bankAccountNumber: String,
  phoneNumber: String,
  typeOfUser: {
    type: String,
    default: 'Beneficiary',
  },
});

// Password Hash
// Run always before pre save
UserSchema.pre('save', async function (next) {
  // If pw field is not changed pass to next middleware no hashing required
  if (!this.isModified('password')) {
    next();
  }
  // Generate salt for hashing pw
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password for login
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Provide token for success auth
UserSchema.methods.getSignedToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

module.exports = User = mongoose.model('user', UserSchema);
