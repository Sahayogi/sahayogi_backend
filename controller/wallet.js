const User = require('../models/User');

exports.updateWallet = async (req, res, next) => {
  console.log('update reached');
  console.log(req.body);
  const { accountAddress, email } = req.body;
  try {
    const user = await User.findOne({ email });
    user.walletAddress = accountAddress;
    const updatedUser = await user.save();
    console.log(updatedUser);
  } catch (error) {
    next(error);
  }
  return res.status(200).json({
    success: true,
    data: 'Wallet Update',
  });
};
