const dayjs = require('dayjs');
const { models } = require('../../../models');
const logger = require('../../../util/logger');

const getExpiringConsents = async ({ partner }) => {
  const { Consent } = models;
  try {
    const data = await Consent.count({ partner, expiry: { $lte: dayjs().add(30, 'days').toDate() } });
    return data;
  } catch (error) {
    logger.error(error);
    return 0;
  }
};

const getRevokeRequests = async ({ partner }) => {
  const { RevokeRequests } = models;
  try {
    const data = await RevokeRequests.count({ partner });
    return data;
  } catch (error) {
    logger.error(error);
    return 0;
  }
};

module.exports = {
  getRevokeRequests,
  getExpiringConsents,
};
