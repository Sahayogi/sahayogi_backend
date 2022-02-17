exports.home = (req, res, next) => {
  res.status(200).json({
    success: true,
    Data: 'Registered User access',
  });
};
exports.benefiaryList = (req, res, next) => {
  res.status(200).json({
    success: true,
    Data: 'BeneficiaryList Accessed',
  });
};
exports.aidAgencyList = (req, res, next) => {
  res.status(200).json({
    success: true,
    Data: 'AidAgency List accessed',
  });
};
exports.vendorList = (req, res, next) => {
  res.status(200).json({
    success: true,
    Data: 'VendorList List accessed',
  });
};
exports.bankList = (req, res, next) => {
  res.status(200).json({
    success: true,
    Data: 'BankList List accessed',
  });
};
