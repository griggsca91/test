const { isCelebrate } = require('celebrate');
const capitalize = require('lodash/capitalize');
const httpStatus = require('http-status');

const APIError = require('./APIError');
const errorsHandler = require('./errorsHandler');

const errorsConverter = (err, req, res, next) => {
  let convertedError = err;

  if (isCelebrate(err)) {
    convertedError = new APIError({
      status: err.statusCode,
      message: err.message,
    });
  } else if (!(err instanceof APIError)) {
    const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || httpStatus[`${status}`];

    convertedError = new APIError({
      status,
      message: capitalize(message),
    });
  }

  return errorsHandler(convertedError, req, res, next);
};

module.exports = errorsConverter;
