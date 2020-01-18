const developmentConfig = {
  isDev: true,
  PORT: process.env.PORT || 3001,
  API_PREFIX: '/api',
  DB_URL: 'mongodb://localhost',
  DB_NAME: 'boilerplate',
  TOKEN_SECRET: 'TOKEN_SECRET',
  TOKEN_OPTIONS: {
    expiresIn: '24h',
  },
  REFRESH_TOKEN_SECRET: 'REFRESH_TOKEN_SECRET',
  REFRESH_TOKEN_OPTIONS: {
    expiresIn: '7d',
  },
};

developmentConfig.DB_URI = `${developmentConfig.DB_URL}/${developmentConfig.DB_NAME}`;

module.exports = developmentConfig;
