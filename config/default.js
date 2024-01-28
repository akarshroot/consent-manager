const constants = require('../src/util/constants');

const config = {
  APP: {
    PORT: process.env.PORT || constants.APP.DEFAULT_PORT,
    NODE_ENV: process.env.NODE_ENV || 'development',
    WHITELISTED_ORIGINS: ['https://bridge.forgefort.com, https://forgefort.com'],
  },
  DB: {
    URI: process.env.DB,
    CONFIG: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  LOGGER: {
    LOG_INDENT: 4,
    LOG_LEVEL: 'debug',
    SILENT_LOGGER: false,
    MORGAN_LOG_LEVEL: 'combined',
  },
  MODULE: {
    AUTH: {
      JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
      JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
    },
  },
  BILLING: {
    COST_PER_CONSENT: 0,
    COST_PER_POLICY: 0,
    STORAGE_PER_CONSENT: 0.0006,
    STORAGE_PER_POLICY: 0.0004,
  },
};

module.exports = config;
