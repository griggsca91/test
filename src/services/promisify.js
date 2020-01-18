const util = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.pbkdf2Async = util.promisify(crypto.pbkdf2);
exports.randomBytesAsync = util.promisify(crypto.randomBytes);
exports.jwtSignAsync = util.promisify(jwt.sign);
exports.jwtVerifyAsync = util.promisify(jwt.verify);
