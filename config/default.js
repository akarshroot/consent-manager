const constants = require('../src/util/constants');

const config = {
  APP: {
    PORT: process.env.PORT || constants.APP.DEFAULT_PORT,
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
};

module.exports = config;
