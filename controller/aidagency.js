const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.addVendor = async (req, res, next) => {
  const access_user = req.user;
  const { username, email, password, address, phoneNumber } = req.body;
  if (!username || !email || !password) {
    return next(new ErrorResponse('Please Input all field', 400));
  }
  const typeOfUser = 'Vendor';
  try {
    const user = await User.create({
      username,
      email,
      password,
      address,
      phoneNumber,
      typeOfUser,
    });
    res.status(200).json({
      success: true,
      data: 'Vendor Added',
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.addBank = async (req, res, next) => {
  const access_user = req.user;
  const { username, email, password, address, phoneNumber } = req.body;
  if (!username || !email || !password) {
    return next(new ErrorResponse('Please Input all field', 400));
  }
  const typeOfUser = 'Bank';
  try {
    const user = await User.create({
      username,
      email,
      password,
      address,
      phoneNumber,
      typeOfUser,
    });
    res.status(200).json({
      success: true,
      data: 'Bank added',
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.addBeneficiary = async (req, res, next) => {
  const access_user = req.user;
  const { username, email, password, address, phoneNumber } = req.body;
  if (!username || !email || !password) {
    return next(new ErrorResponse('Please Input all field', 400));
  }
  try {
    const user = await User.create({
      username,
      email,
      password,
      address,
      phoneNumber,
    });
    res.status(200).json({
      success: true,
      data: 'Beneficiary added',
      user,
    });
  } catch (error) {
    next(error);
  }
};
