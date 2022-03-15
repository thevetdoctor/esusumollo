const { ErrorClone } = require('./error');

module.exports = (requiredFields, requestBody) => {
  const missingFields = requiredFields.filter((field) => (Object.keys(requestBody).indexOf(field) < 0) || (Object.values(requestBody)[Object.keys(requestBody).indexOf(field)] === ''));
  if (missingFields.length) {
    throw new ErrorClone(401, `Missing field(s): ${[...missingFields]}`);
  }
};
