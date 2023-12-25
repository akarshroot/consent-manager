const winston = require('winston');

const { format } = winston;

const logger = winston.createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((msg) => `${msg.timestamp} [${msg.level}] ${msg.message}`),
  ),
  transports: [new winston.transports.Console({ level: 'http' })],
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = { logger };
