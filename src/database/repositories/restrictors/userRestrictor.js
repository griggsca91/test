const { omitUndefined } = require('../../../services');

const userRestrictor = (user) => {
  return omitUndefined({
    _id: user._id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};

module.exports = userRestrictor;
