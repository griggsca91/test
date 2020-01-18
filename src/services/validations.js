const { Joi } = require('celebrate');

exports.password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'));
exports.email = Joi.string()
  .email()
  .required();
