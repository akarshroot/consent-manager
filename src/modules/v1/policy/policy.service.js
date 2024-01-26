const _ = require('lodash');
const boom = require('@hapi/boom');
const { models } = require('../../../models');
const logger = require('../../../util/logger');
const constants = require('../../../util/constants');

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

const consent = async ({ clientPolicyId, uid, timestamp, partner }) => {
  const { Policy, Consent } = models;
  try {
    const { _id: policyId } = await Policy.findOne({ policyId: clientPolicyId });
    const data = await Consent.updateOne({ policyId, uid }, { policyId, clientPolicyId, uid, timestamp, partner, $inc: { __v: 1 } }, { upsert: true });
    if (data.upsertedId) {
      return { message: constants.STANDARD_SUCCESS_MESSAGES.CONSENT_POSTED };
    }
    return { message: constants.STANDARD_SUCCESS_MESSAGES.CONSENT_UPDATED };
  } catch (error) {
    logger.error(error.message);
    throw boom.badData('Bad Consent Request');
  }
};

const fetchConsent = async ({ uid, partner, clientPolicyId }) => {
  const { Consent } = models;
  let data;
  try {
    if (clientPolicyId) {
      data = await Consent.findOne({ clientPolicyId, uid }, { clientPolicyId: 1, uid: 1, timestamp: 1, _id: 0 });
    } else {
      data = await Consent.find({ partner, uid }, { clientPolicyId: 1, uid: 1, timestamp: 1, _id: 0 });
    }
    return data;
  } catch (error) {
    logger.error(error.message);
    throw boom.badData('Bad Fetch Consent Request');
  }
};

module.exports = {
  consent,
  postPolicy,
  fetchConsent,
};
