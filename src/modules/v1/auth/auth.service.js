const _ = require('lodash');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const { models } = require('../../../models');
const constants = require('../../../util/constants');
const { mintToken } = require('./auth.util');

const populateToken = async ({ partnerId }) => {
  const { Partner } = models;
  const partnerData = await Partner.findOne({ _id: partnerId }).populate('rbac').lean();
  _.set(partnerData, 'rbac', _.map(partnerData.rbac, (entity) => _.omit(entity, ['password', '_id', '__v'])));
  return partnerData;
};

const authenticate = async ({ username, password }) => {
  const { Entity } = models;
  let entityData = await Entity.findOne({ username });
  if (!entityData || _.isEmpty(entityData)) {
    throw boom.unauthorized('Invalid Credentials');
  }
  const hash = await bcrypt.hash(password, constants.MODULE.AUTH.SALT_ROUNDS);
  const isValid = await bcrypt.compare(_.get(entityData, 'password'), hash);
  if (isValid) {
    const payload = {
      username,
      partner: _.get(entityData, 'partner'),
      permissions: {
        read: entityData.permissions.read,
        write: entityData.permissions.write,
      },
    };
    entityData = _.omit(entityData.toObject(), ['password', '_id', '__v']);
    const token = mintToken({ payload });
    _.set(entityData, 'jwt', token);
    return entityData;
  }
  throw boom.unauthorized('Invalid Credentials');
};

const register = async ({ username, password, partner, source, permissions = { read: false, write: false } }) => {
  const { Entity, Partner } = models;
  if (!permissions.write) {
    throw boom.forbidden(constants.STANDARD_ERROR_MESSAGES[403]);
  }
  let entityData = await Entity({ username, password, partner, metadata: { source } }).save();
  await Partner.findOneAndUpdate({ _id: partner }, { $push: { rbac: _.get(entityData, '_id') } });
  entityData = _.omit(entityData.toObject(), ['password', '_id', '__v']);
  return entityData;
};

module.exports = {
  populateToken,
  authenticate,
  register,
};
