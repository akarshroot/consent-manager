const _ = require('lodash');
const errorDecorator = require('../util/error-decorator');
const { validateToken } = require('../util/token');

const authenticationMiddleware = () =>
  errorDecorator((req, _res, next) => {
    const authToken = req.headers.authorization;
    let partnerToken;
    if (authToken && _.isArray(authToken.split(' '))) {
      partnerToken = req.headers.authorization.split(' ')[1];
      if (partnerToken) {
        const entityData = validateToken({ token: partnerToken });
        req.headers['x-entity-details'] = entityData;
        req.entityData = entityData;
        return next();
      }
    }
    return next();
  });

module.exports = authenticationMiddleware;
