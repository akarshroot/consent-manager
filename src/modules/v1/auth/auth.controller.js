const _ = require('lodash');
const service = require('./auth.service');
const errorDecorator = require('../../../util/error-decorator');

const populateToken = errorDecorator(async (req, _res, next) => {
  const { partner } = req.entityData;
  const data = await service.populateToken({ partnerId: partner });
  next(data);
});

const authenticate = errorDecorator(async (req, res, next) => {
  const { username, password } = req.body;
  const data = await service.authenticate({ username, password });
  res.setHeader('Set-Cookie', `entity-token=${_.get(data, 'jwt')}`);
  next(_.omit(data, 'jwt'));
});

const register = errorDecorator(async (req, _res, next) => {
  const { partner, permissions } = req.entityData;
  const { username, password } = req.body;
  const { source } = req.query;
  const data = await service.register({ username, password, partner, source, permissions });
  next(data);
});

module.exports = {
  populateToken,
  authenticate,
  register,
};
