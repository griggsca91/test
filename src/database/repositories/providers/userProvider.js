const { userModel } = require('../../models');
const userRestrictor = require('../restrictors/userRestrictor');

exports.createUser = async (user) => {
  user.email = user.email.toLowerCase();
  const newUser = await userModel.create(user);

  return newUser ? userRestrictor(newUser) : null;
};

exports.getByEmail = async ({ email }) => {
  const lowerCaseEmail = email.toLowerCase();
  const user = await userModel.findOne({ email: lowerCaseEmail });

  return user ? userRestrictor(user) : null;
};
