const development = require('./development');
const production = require('./production');

const config = {
  development,
  production,
};

module.exports = config[process.env.NODE_ENV || 'development'];
