const config = require('../../../config');
const { jwtSignAsync } = require('../../../services/promisify');

const signIn = async (req, res) => {
  const { user } = req;
  const { TOKEN_SECRET, TOKEN_OPTIONS, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_OPTIONS } = config;

  const token = await jwtSignAsync({ email: user.email }, TOKEN_SECRET, TOKEN_OPTIONS);
  const refreshToken = await jwtSignAsync(
    { email: user.email },
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_OPTIONS,
  );

  return res.status(200).json({ user, token, refreshToken });
};

module.exports = signIn;
