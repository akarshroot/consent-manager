const _ = require('lodash');
const boom = require('@hapi/boom');
const { models } = require('../../../models');
const { logger } = require('../../../util/logger');

const postPolicy = async ({ partner, policyId, title, attributes }) => {
  const { Policy, PolicyAttribute } = models;
  const attributePromises = _.map(attributes, (att) => new PolicyAttribute(att).save());
  try {
    const attributeIds = await Promise.all(attributePromises);
    const data = await new Policy({ partner, policyId, title, attributes: attributeIds }).save();
    return data;
  } catch (error) {
    logger.error(error.message);
    throw boom.badData(error.message);
  }
};

module.exports = {
  postPolicy,
};
