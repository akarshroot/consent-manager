const winston = require('winston');

const { format } = winston;

const logger = winston.createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf((msg) => {
            return `${msg.timestamp} [${msg.level}] ${msg.message}`;
        })
    ),
    transports: [new winston.transports.Console({level: 'http'})],
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

module.exports = { logger };