const _ = require('lodash');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const { mintToken } = require('./auth.util');
const { models } = require('../../../models');
const logger = require('../../../util/logger');
const constants = require('../../../util/constants');

const populateToken = async ({ partnerId }) => {
  const { Partner } = models;
  const partnerData = await Partner.findOne({ _id: partnerId }).populate('rbac').lean();
  _.set(
    partnerData,
    'rbac',
    _.map(partnerData.rbac, (entity) => _.omit(entity, ['password', '_id', '__v'])),
  );
  return partnerData;
};

const authenticate = async ({ username, password }) => {
  const { Entity } = models;
  let entityData = await Entity.findOne({ username }, { username: 1, partner: 1, permissions: 1, password: 1, _id: 0 });
  if (!entityData || _.isEmpty(entityData)) {
    throw boom.unauthorized('Invalid Credentials');
  }
  const isValid = await bcrypt.compare(password, _.get(entityData, 'password'));
  if (!isValid) {
    throw boom.unauthorized('Invalid Credentials');
  }
  entityData = _.omit(entityData.toObject(), ['password']);
  const token = mintToken({ payload: entityData });
  _.set(entityData, 'jwt', token);
  return entityData;
};

const register = async ({
  username,
  password,
  partner,
  source,
  write,
  permissions = { read: false, write: false },
}) => {
  if (!permissions.write) {
    throw boom.forbidden(constants.STANDARD_ERROR_MESSAGES[constants.HTTP_STATUS_CODES.FORBIDDEN]);
  }
  const { Entity, Partner } = models;
  let entityData;
  const hash = await bcrypt.hash(password, constants.MODULE.AUTH.SALT_ROUNDS);
  try {
    entityData = await Entity({
      username,
      password: hash,
      partner,
      metadata: { source },
      permissions: { write },
    }).save();
  } catch (error) {
    logger.error(error);
    throw boom.badData(error);
  }
  await Partner.findOneAndUpdate({ _id: partner }, { $push: { rbac: _.get(entityData, '_id') } });
  entityData = _.omit(entityData.toObject(), ['password', '_id', '__v']);
  return entityData;
};

module.exports = {
  populateToken,
  authenticate,
  register,
};
