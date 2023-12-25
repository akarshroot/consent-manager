const constants = {
  APP: {
    DEFAULT_PORT: 5000,
  },
  MODULE: {
    AUTH: {
      SALT_ROUNDS: 10,
    },
  },
  HTTP_STATUS_CODES: {
    INTERNAL_SERVER_ERROR: 500,
    OK: 200,
    NOT_FOUND: 404,
  },
  STANDARD_ERROR_MESSAGES: {
    500: 'Internal Server Error',
  },
};

module.exports = constants;
