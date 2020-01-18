const httpStatus = require('http-status');

const config = require('../../../config');
const { userProvider } = require('../../../database/repositories/providers');
const { jwtSignAsync, jwtVerifyAsync } = require('../../../services/promisify');
const { APIError } = require('../../../services/errors');

const refresh = async (req, res) => {
  const {
    body: { refreshToken },
  } = req;
  const { TOKEN_SECRET, TOKEN_OPTIONS, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_OPTIONS } = config;

  try {
    const { email } = await jwtVerifyAsync(refreshToken, REFRESH_TOKEN_SECRET);
    const token = await jwtSignAsync({ email: email }, TOKEN_SECRET, TOKEN_OPTIONS);
    const newRefreshToken = await jwtSignAsync(
      { email: email },
      REFRESH_TOKEN_SECRET,
      REFRESH_TOKEN_OPTIONS,
    );
    const user = await userProvider.getByEmail({ email });

    if (user) {
      return res.status(200).json({ user, token, refreshToken: newRefreshToken });
    } else {
      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    }
  } catch (error) {
    throw new APIError({
      message: 'User does not exist',
      status: httpStatus.NOT_FOUND,
    });
  }
};

module.exports = refresh;
