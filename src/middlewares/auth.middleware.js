const _ = require('lodash');
const errorDecorator = require('../util/error-decorator');
const { validateToken } = require('../util/token');

const authenticationMiddleware = () =>
  errorDecorator((req, _res, next) => {
    const authToken = req.headers.authorization;
    let partnerToken = req.headers['x-entity-details'];
    if (authToken && _.isArray(authToken.split(' '))) {
      partnerToken = req.headers.authorization.split(' ')[1];
      if (partnerToken) {
        const entityData = validateToken({ token: partnerToken });
        req.headers['x-entity-details'] = entityData;
        req.entityData = entityData;
        return next();
      }
    } else if (partnerToken) {
      req.entityData = JSON.parse(req.headers['x-entity-details']);
      return next();
    }
    return next();
  });

module.exports = authenticationMiddleware;
