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
    OK: 200,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
  },
  STANDARD_SUCCESS_MESSAGES: {
    CONSENT_POSTED: 'Consent Stored Successfully.',
    CONSENT_UPDATED: 'Consent Updated Successfully.',
  },
  STANDARD_ERROR_MESSAGES: {
    500: 'Internal Server Error',
    403: 'You do not have authority to perform this action. Please contact your administrator.',
  },
};

module.exports = constants;
