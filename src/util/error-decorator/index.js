const constants = require('../constants');

/* eslint-disable func-style */
const errorDecorator = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    if (error.output?.statusCode < constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR) {
      return res.status(error.output.statusCode).json({
        error: {
          message: error.message,
        },
        is_success: false,
      });
    }
    console.log(error);
    return res.status(constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: {
        message: constants.STANDARD_ERROR_MESSAGES[500],
      },
      is_success: true,
    });
  }
};

module.exports = errorDecorator;
