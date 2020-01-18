const httpStatus = require('http-status');

const config = require('../../../config');
const { userProvider } = require('../../../database/repositories/providers');
const { jwtSignAsync } = require('../../../services/promisify');
const { APIError } = require('../../../services/errors');

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const { TOKEN_SECRET, TOKEN_OPTIONS, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_OPTIONS } = config;
  const existedUser = await userProvider.getByEmail({ email });

  if (existedUser) {
    throw new APIError({
      message: 'Email has already exist.',
      status: httpStatus.CONFLICT,
    });
  }

  const user = await userProvider.createUser({ email, password });

  const token = await jwtSignAsync({ email }, TOKEN_SECRET, TOKEN_OPTIONS);
  const refreshToken = await jwtSignAsync(
    { email: user.email },
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_OPTIONS,
  );

  return res.status(200).json({ user, token, refreshToken });
};

module.exports = signUp;
