const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');

exports.adminRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  const typeOfUser = 'Admin';
  try {
    const user = await User.create({
      username,
      email,
      password,
      typeOfUser,
    });
    getToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }
  try {
    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    if (!user) {
      return next(new ErrorResponse('Invalid Credentials', 401));
    }
    const isMatch = await user.matchPassword(password);
    console.log(isMatch);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid Credentials', 401));
    }
    getToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const getToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
    role: user.typeOfUser,
    username: user.username,
  });
};
