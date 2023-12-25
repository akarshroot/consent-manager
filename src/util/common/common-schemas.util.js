const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const headerSchema = joi.object().keys({
  username: joi.string().required(),
  partner: joi.objectId().required(),
}).required();

module.exports = {
  headerSchema,
};
