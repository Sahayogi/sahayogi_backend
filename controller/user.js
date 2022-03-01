const User = require('../models/User');
const Project = require('../models/Project');
const ErrorResponse = require('../utils/errorResponse');

exports.home = async (req, res, next) => {
  const numberOfVendor = await User.find({ typeOfUser: 'Vendor' }).count();
  const numberOfBeneficiary = await User.find({
    typeOfUser: 'Beneficiary',
  }).count();
  const numberOfBank = await User.find({ typeOfUser: 'Bank' }).count();
  const numberOfProject = await Project.find().count();
  const data = {
    numberOfVendor,
    numberOfBank,
    numberOfBeneficiary,
    numberOfProject,
  };

  // console.log(data);
  res.status(200).json({
    success: true,
    data: data,
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
