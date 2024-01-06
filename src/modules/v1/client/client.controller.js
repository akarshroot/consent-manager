const errorDecorator = require('../../../util/error-decorator');
const service = require('./client.service');

const dashboard = errorDecorator(async (req, _res, next) => {
  const { username, partner, permissions } = req.entityData;
  const data = await service.dashboard({ username, partner, permissions });
  next(data);
});

const consent = errorDecorator(async (req, _res, next) => {
  const { username, partner, permissions } = req.entityData;
  const data = await service.consent({ username, partner, permissions });
  next(data);
});

module.exports = {
  dashboard,
  consent,
};
