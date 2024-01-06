const config = require('config');

const dashboard = async ({ username, partner, permissions }) => {
  return { test: true };
};

const consent = async ({ username, partner, permissions }) => {
  return config.MODULE.AUTH.JWT_PRIVATE_KEY;
};

module.exports = {
  dashboard,
  consent,
};
