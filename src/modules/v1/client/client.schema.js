const joi = require('joi');
const { headerSchema } = require('../../../util/common/common-schemas.util');

const dashboardSchema = joi.object().keys({
  entityData: headerSchema.required(),
});

module.exports = {
  dashboardSchema,
};
