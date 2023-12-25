const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
// const config = require('');

const mintToken = ({ payload }) => {
  const secret = fs.readFileSync(path.join(__dirname, '../../../../config/private.key'), 'utf-8');
  return jwt.sign(payload, secret, { algorithm: 'RS256', expiresIn: '7 days' });
};

module.exports = {
  mintToken,
};
