const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');
const config = require('config');
const constants = require('../constants');

const logFormat = format.printf((info) => {
  if (info.message instanceof Object) {
    // eslint-disable-next-line no-param-reassign
    info.message = `\n${JSON.stringify(info.message, null, config.LOGGER.LOG_INDENT)}`;
  }
  return `${info.timestamp}: [${info.level}] ${info.message}`;
});
const logger = createLogger({
  level: config.LOGGER.LOG_LEVEL,
  silent: config.LOGGER.SILENT_LOGGER,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.colorize(),
    logFormat,
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
});
logger.successHandler = morgan(config.LOGGER.MORGAN_LOG_LEVEL, {
  skip: (_req, res) => res.statusCode >= constants.HTTP_STATUS_CODES.BAD_REQUEST,
  stream: { write: (message) => logger.info(message) },
});
logger.errorHandler = morgan(config.LOGGER.MORGAN_LOG_LEVEL, {
  skip: (_req, res) => res.statusCode < constants.HTTP_STATUS_CODES.BAD_REQUEST,
  stream: { write: (message) => logger.error(message) },
});

module.exports = logger;
