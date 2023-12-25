const joi = require('joi');
const boom = require('@hapi/boom');
const errorDecorator = require('../util/error-decorator');

module.exports = function (schema) {
  return errorDecorator(async (req, _res, next) => {
    const result = await schema.validate(req, {
      allowUnknown: true,
    });
    if (result.error) {
      throw boom.badData(result.error.toString());
    }
    Object.assign(req, result.value);
    return next();
  });
};
