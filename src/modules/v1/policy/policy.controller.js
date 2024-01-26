const errorDecorator = require('../../../util/error-decorator');
const service = require('./policy.service');

const postPolicy = errorDecorator(async (req, _res, next) => {
  const { partner } = req.entityData;
  const { policyId, title, attributes } = req.body;
  const data = await service.postPolicy({ partner, policyId, title, attributes });
  next(data);
});

const consent = errorDecorator(async (req, _res, next) => {
  const { partner } = req.entityData;
  const { policy_id: clientPolicyId } = req.params;
  const { uid, timestamp } = req.body;
  const data = await service.consent({ clientPolicyId, uid, timestamp, partner });
  next(data);
});

const fetchConsent = errorDecorator(async (req, _res, next) => {
  const { partner } = req.entityData;
  const { uid } = req.params;
  const { policy_id: policyId } = req.query;
  const data = await service.fetchConsent({ clientPolicyId: policyId, uid, partner });
  next(data);
});

module.exports = {
  postPolicy,
  consent,
  fetchConsent,
};
