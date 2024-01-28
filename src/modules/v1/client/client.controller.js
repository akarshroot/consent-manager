const errorDecorator = require('../../../util/error-decorator');
const service = require('./client.service');

const dashboard = errorDecorator(async (req, _res, next) => {
  const { username, partner, permissions } = req.entityData;
  const data = await service.dashboard({ username, partner, permissions });
  next(data);
});

const storageSync = errorDecorator(async (req, _res, next) => {
  const data = await service.storageSync();
  next(data);
});

module.exports = {
  dashboard,
  storageSync,
};
