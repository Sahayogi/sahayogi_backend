exports.home = (req, res, next) => {
  res.status(200).json({
    success: true,
    Data: 'Registered User access',
  });
};
