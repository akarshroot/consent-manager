const joi = require('joi');
const { headerSchema } = require('../../../util/common/common-schemas.util');

const policySchema = joi.object().keys({
  entityData: headerSchema.required(),
  body: {
    policyId: joi.string().required(),
    title: joi.string().required(),
    attributes: joi.array().items(joi.object().keys({
      attId: joi.string().required(),
      title: joi.string().required(),
      validity: joi.number().required(),
      description: joi.string().optional().allow(''),
    })),
  },
});

const consentSchema = joi.object().keys({
  entityData: headerSchema.required(),
  params: joi.object().keys({
    policy_id: joi.string().required(),
  }),
  body: joi.object().keys({
    timestamp: joi.date().required(),
    uid: joi.string().required(),
  }),
});

module.exports = {
  policySchema,
  consentSchema,
};
