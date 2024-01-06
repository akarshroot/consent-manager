const jwt = require('jsonwebtoken');
const config = require('config');

const mintToken = ({ payload }) => {
  const secret = config.MODULE.AUTH.JWT_PRIVATE_KEY;
  return jwt.sign(payload, secret, { algorithm: 'RS256', expiresIn: '7 days' });
};

module.exports = {
  mintToken,
};
