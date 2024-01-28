const _ = require('lodash');
const boom = require('@hapi/boom');
const dayjs = require('dayjs');
const { models } = require('../../../models');
const logger = require('../../../util/logger');
const constants = require('../../../util/constants');

const postPolicy = async ({ partner, policyId, title, attributes }) => {
  const { Policy, PolicyAttribute } = models;
  attributes = _.map(attributes, (att) => ({ ...att, partner }));
  const attributeTitles = _.map(attributes, 'title');
  const bulkWriteOps = attributes.map((att) => ({
    updateOne: {
      filter: { partner, title: att.title },
      update: {
        ...att,
      },
      upsert: true,
    },
  }));
  try {
    await PolicyAttribute.bulkWrite(bulkWriteOps);
    const attributeIds = _.map(
      await PolicyAttribute.find({ partner, title: { $in: attributeTitles } }, { _id: 1 }),
      '_id',
    );
    const data = await new Policy({ partner, clientPolicyId: policyId, title, attributes: attributeIds }).save();
    return data;
  } catch (error) {
    logger.error(error.message);
    throw boom.badData(error.message);
  }
};

const consent = async ({ clientPolicyId, uid, timestamp, partner }) => {
  const { Policy, Consent } = models;
  try {
    const { attributes } = await Policy.findOne({ clientPolicyId }).populate('attributes');
    const bulkUpdateOps = attributes.map((att) => ({
      updateOne: {
        filter: { uid, policyAttributeId: att._id },
        update: {
          uid,
          partner,
          timestamp,
          $inc: { __v: 1 },
          $set: {
            expiry: dayjs().add(att.validity, 'days').toDate(),
            updatedAt: dayjs().toDate(),
          },
          metadata: {
            source: clientPolicyId,
          },
        },
        upsert: true,
      },
    }));
    const data = await Consent.bulkWrite(bulkUpdateOps);
    if (data.upsertedCount > 0) {
      return { message: constants.STANDARD_SUCCESS_MESSAGES.CONSENT_POSTED };
    }
    return { message: constants.STANDARD_SUCCESS_MESSAGES.CONSENT_UPDATED };
  } catch (error) {
    logger.error(error.message);
    throw boom.badData('Bad Consent Request');
  }
};

const fetchConsent = async ({ uid, partner, clientPolicyId }) => {
  const { Policy, Consent, ConsentLog } = models;
  let data;
  try {
    if (clientPolicyId) {
      const attributes = await Policy.findOne({ clientPolicyId }).populate('attributes');
      const attIds = _.map(attributes, '_id');
      data = await Consent.findOne({ uid, policyAttributeId: { $in: attIds } }, { _id: 0, __v: 0 });
      if (data) {
        setTimeout(async () => {
          await ConsentLog.findOneAndUpdate(
            { consent: data._id, partner, date: dayjs().startOf('day').toDate() },
            { $inc: { count: 1 } },
            {
              upsert: true,
            },
          );
        }, 0);
      }
    } else {
      data = await Consent.find({ partner, uid }, { __v: 0, _id: 0 });
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
