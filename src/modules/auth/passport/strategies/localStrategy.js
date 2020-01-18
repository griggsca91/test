const { Strategy } = require('passport-local');
const omit = require('lodash/omit');
const httpStatus = require('http-status');

const { userModel } = require('../../../../database/models');
const { APIError } = require('../../../../services/errors');

const localStrategy = new Strategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const lowerCaseEmail = email.toLowerCase();
    const user = await userModel.findOne({ email: lowerCaseEmail }).select('+password +salt');

    if (!user) {
      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
      throw new APIError({
        message: 'Password is incorrect',
        status: httpStatus.BAD_REQUEST,
      });
    }

    return done(null, omit(user.toObject(), ['password', 'salt']));
  } catch (error) {
    return done(error);
  }
});

module.exports = localStrategy;
