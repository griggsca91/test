const { Strategy, ExtractJwt } = require('passport-jwt');
const httpStatus = require('http-status');

const config = require('../../../../config');
const { userProvider } = require('../../../../database/repositories/providers');
const { APIError } = require('../../../../services/errors');

const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.TOKEN_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await userProvider.getByEmail({ email: jwtPayload.email });

      if (!user) {
        throw new APIError({
          message: 'User does not exist',
          status: httpStatus.NOT_FOUND,
        });
      }

      return done(null, user);
    } catch (error) {
      done(error);
    }
  },
);

module.exports = jwtStrategy;
