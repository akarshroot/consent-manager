const joi = require('joi');
const { headerSchema } = require('../../../util/common/common-schemas.util');

const validateTokenSchema = joi.object({
  entityData: headerSchema.required(),
});

const loginSchema = joi.object({
  body: joi.object().keys({
    username: joi.string().required(),
    password: joi.string().required(),
  }),
});

const registerSchema = joi.object({
  entityData: headerSchema.required(),
  body: joi.object().keys({
    username: joi.string().required(),
    password: joi.string().required(),
    write: joi.boolean().required(),
  }),
  query: joi.object({
    source: joi.string().required(),
  }),
});

module.exports = {
  validateTokenSchema,
  loginSchema,
  registerSchema,
};
