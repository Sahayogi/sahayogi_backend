exports.addVendor = (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: 'Accessed addVendor',
    user,
  });
};
