const errorDecorator = require('../../../util/error-decorator');
const service = require('./policy.service');

const postPolicy = errorDecorator(async (req, _res, next) => {
  const { partner } = req.entityData;
  const { policyId, title, attributes } = req.body;
  const data = await service.postPolicy({ partner, policyId, title, attributes });
  next(data);
});

const consent = errorDecorator(async (req, _res, next) => {
  
});

module.exports = {
  postPolicy,
  consent,
};
