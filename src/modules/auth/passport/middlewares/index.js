const passport = require('passport');

exports.localPassport = passport.authenticate('local', { session: false });
exports.jwtPassport = passport.authenticate('jwt', { session: false });
