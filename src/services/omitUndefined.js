const omitBy = require('lodash/omitBy');
const isUndefined = require('lodash/isUndefined');

const omitUndefined = (data) => {
  data = omitBy(data, (value) => value === 'undefined');

  return omitBy(data, isUndefined);
};

module.exports = omitUndefined;
