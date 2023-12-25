/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const validateToken = ({ token }) => {
  const secret = fs.readFileSync(path.join(__dirname, '../../../config/public.key'), 'utf-8');
  try {
    return jwt.verify(token, secret, { algorithm: 'RS256' });
  } catch (error) {
    throw boom.unauthorized('Invalid Credentials.');
  }
};

module.exports = {
  validateToken,
};
