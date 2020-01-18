const httpStatus = require('http-status');

/**
 * @extends Error
 */
class APIError extends Error {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   */
  constructor({ message, status = httpStatus.INTERNAL_SERVER_ERROR, stack }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.stack = stack;
  }
}

module.exports = APIError;
