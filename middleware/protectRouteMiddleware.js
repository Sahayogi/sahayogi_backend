const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc middleware for admin only access
exports.adminOnlyAccess = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // console.log(token);
  if (!token) {
    return next(
      new ErrorResponse('Not authorized to access this route t', 401)
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(`dec${decoded}`);
    const user = await User.findById(decoded.id);
    // console.log(user);
    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }
    // console.log(user.typeOfUser);
    if (user.typeOfUser !== 'Admin') {
      console.log('Non admin access.');
      return next(
        new ErrorResponse('Not authorized to access this route', 401)
      );
    }
    req.user = user;
    console.log('Admin access');
    next();
  } catch (error) {
    next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// @desc middleware for aid agency and admin access
exports.aidAgencyAccess = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // console.log(token);
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }
    if (user.typeOfUser !== 'Admin' && user.typeOfUser !== 'AidAgency') {
      console.log('Being accessed by someone beside admin and aidagency');
      return next(
        new ErrorResponse('Not authorized to access this route', 401)
      );
    }
    req.user = user;
    console.log('Aid AGency Access');
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// @desc middleware for any user access
exports.registeredUserAccess = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // console.log(token);
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }
    console.log('User access');
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};
