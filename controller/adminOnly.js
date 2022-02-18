const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.addAidAgency = async (req, res, next) => {
  console.log(req.user);
  const { username, email, password, location, phoneNumber } = req.body;

  if (!username || !email || !password) {
    return next(new ErrorResponse('Please Input all field', 400));
  }
  const typeOfUser = 'AidAgency';
  try {
    const user = await User.create({
      username,
      email,
      password,
      location,
      phoneNumber,
      typeOfUser,
    });
    res.status(200).json({
      success: true,
      data: 'aidAgency added',
      user,
    });
  } catch (error) {
    next(error);
  }
};
