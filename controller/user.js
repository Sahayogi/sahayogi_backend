const User = require('../models/User');
const errorResponse = require('../utils/errorResponse');

exports.home = (req, res, next) => {
  res.status(200).json({
    success: true,
    Data: 'Registered User access',
  });
};
exports.beneficiaryList = async (req, res, next) => {
  const data = await User.find({ typeOfUser: 'Beneficiary' });
  console.log(data);
  res.status(200).json({
    success: true,
    data: data,
  });
};
exports.aidAgencyList = async (req, res, next) => {
  const data = await User.find({ typeOfUser: 'AidAgency' });
  res.status(200).json({
    success: true,
    agencyList: data,
  });
};
exports.vendorList = async (req, res, next) => {
  const data = await User.find({ typeOfUser: 'Vendor' });

  res.status(200).json({
    success: true,
    data: data,
  });
};
exports.bankList = async (req, res, next) => {
  const data = await User.find({ typeOfUser: 'Bank' });
  res.status(200).json({
    success: true,
    data: data,
  });
};
