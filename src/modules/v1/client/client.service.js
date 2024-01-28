const _ = require('lodash');
const config = require('config');
const dayjs = require('dayjs');
const { models } = require('../../../models');
const logger = require('../../../util/logger');
const { getExpiringConsents, getRevokeRequests } = require('./client.util');

const dashboard = async ({ partner }) => {
  const { Partner, ConsentLog, PartnerStorage } = models;
  const partnerData = await Partner.findOne({ _id: partner });
  const [apiConsumption, expiringConsents, revokeRequests, storage] = await Promise.all([
    ConsentLog.aggregate([
      {
        $match: {
          date: {
            $gte: dayjs().subtract(7, 'days').toDate(),
          },
        },
      },
      {
        $group: {
          _id: '$date',
          count: {
            $sum: '$count',
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]),
    getExpiringConsents({ partner }),
    getRevokeRequests({ partner }),
    PartnerStorage.findOne({ partner }, { consents: 1, policies: 1, updatedAt: 1, _id: 0 }).lean(),
  ]);
  let billableStorage = config.BILLING.STORAGE_PER_CONSENT * storage.consents;
  billableStorage += config.BILLING.STORAGE_PER_POLICY * storage.policies;
  // eslint-disable-next-line no-magic-numbers
  const storagePercentage = Number(((billableStorage / 5) * 100).toFixed(3));
  const avgApiConsumption = _.meanBy(apiConsumption, 'count');
  // eslint-disable-next-line no-magic-numbers
  const apiConsumptionPercentage = Number(((avgApiConsumption / 86400) * 100).toFixed(3)); // Assuming 1 API call per second
  return {
    organization: partnerData.organization,
    expiringConsents,
    revokeRequests,
    apiConsumption,
    billableStorage,
    ...storage,
    avgApiConsumption,
    storagePercentage,
    apiConsumptionPercentage,
  };
};

const storageSync = async () => {
  const { Consent, Policy, PartnerStorage } = models;
  let consentsByPartner;
  let policiesByPartner;
  try {
    consentsByPartner = await Consent.aggregate([
      {
        $group: {
          _id: '$partner',
          count: { $sum: 1 },
        },
      },
    ]);
    policiesByPartner = await Policy.aggregate([
      {
        $group: {
          _id: '$partner',
          count: { $sum: 1 },
        },
      },
    ]);
    const bulkUpdateOps = consentsByPartner.map((consent) => ({
      updateOne: {
        filter: { partner: consent._id },
        update: {
          consents: consent.count,
          policies: _.get(_.find(policiesByPartner, ['_id', consent._id]), 'count', 0),
          updatedAt: dayjs().toDate(),
          $inc: { __v: 1 },
        },
        upsert: true,
      },
    }));
    const data = await PartnerStorage.bulkWrite(bulkUpdateOps);
    return data;
  } catch (error) {
    logger.error(error);
    return {};
  }
};

module.exports = {
  dashboard,
  storageSync,
};
