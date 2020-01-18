const productionConfig = {
  isDev: false,
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

productionConfig.DB_URI = `${productionConfig.DB_URL}/${productionConfig.DB_NAME}`;

module.exports = productionConfig;
