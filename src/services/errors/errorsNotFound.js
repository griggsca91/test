const httpStatus = require('http-status');

const APIError = require('./APIError');
const errorsHandler = require('./errorsHandler');

const errorsNotFound = (req, res, next) => {
  const err = new APIError({
    status: httpStatus.NOT_FOUND,
    message: 'Not Found',
  });

  return errorsHandler(err, req, res, next);
};

module.exports = errorsNotFound;
