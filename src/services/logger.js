const winston = require('winston');
const path = require('path');
require('winston-daily-rotate-file');

const config = require('../config');

const transports = [
  new winston.transports.Console({
    json: true,
    colorize: true,
  }),
];

if (!config.isDev) {
  transports.push(
    new winston.transports.DailyRotateFile({
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      dirname: `${path.resolve('.')}/logs`,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  );
}

const logger = winston.createLogger({ transports });

module.exports = logger;
