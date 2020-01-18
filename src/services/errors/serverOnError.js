const config = require('../../config');

const serverOnError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const { PORT } = config;

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      /* eslint-disable no-console */
      console.error(bind + ' requires elevated privileges');
      /* eslint-disable no-console */
      process.exit(1);
    case 'EADDRINUSE':
      /* eslint-disable no-console */
      console.error(bind + ' is already in use');
      /* eslint-disable no-console */
      process.exit(1);
    default:
      throw error;
  }
};

module.exports = serverOnError;
