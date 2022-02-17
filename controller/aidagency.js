exports.addVendor = (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: 'Vendor Added',
    user,
  });
};
exports.addBank = (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: 'Bank added',
    user,
  });
};
exports.addBeneficiary = (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: 'Beneficiary added',
    user,
  });
};
