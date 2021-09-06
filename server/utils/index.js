const utils = {};

utils.isEmptyObject = (object) => {
  return Object.keys(object).length === 0 && object.constructor === Object
}

module.exports = utils;