const { celebrate, Joi, Segments } = require('celebrate');

const validations = require('../../../../services/validations');

exports.signUp = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: validations.email,
    password: validations.password,
  }),
});

exports.signIn = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: validations.email,
    password: validations.password,
  }),
});

exports.refresh = celebrate({
  [Segments.BODY]: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
});
