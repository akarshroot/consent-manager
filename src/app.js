const config = require('config');
const express = require('express');
const cors = require('cors');
const boom = require('@hapi/boom');
const cookieParser = require('cookie-parser');
const logger = require('./util/logger');
const setupRoutes = require('./modules');
const constants = require('./util/constants');

const app = express();
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (config.APP.WHITELISTED_ORIGINS.indexOf(origin) !== -1 || config.APP.NODE_ENV === 'development') {
        return callback(null, true);
      }
      throw boom.proxyAuthRequired('cors');
    },
  }),
);
app.use(cookieParser());

app.use(
  express.json({
    extended: true,
  }),
);

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(logger.successHandler);
app.use(logger.errorHandler);

app.use('/', setupRoutes());

app.get('/health-check', (_req, res) => {
  res.status(constants.HTTP_STATUS_CODES.OK).json({
    message: 'Server healthy.',
  });
});

// eslint-disable-next-line no-unused-vars
app.use((data, _req, res, _next) =>
  res.json({
    data,
    is_success: true,
  }),
);

app.use('*', (_req, res) => {
  res.status(constants.HTTP_STATUS_CODES.NOT_FOUND).json({
    error: {
      message: 'Not Found',
    },
    is_success: false,
  });
});

const server = app.listen(config.APP.PORT, () => {
  logger.info(`Server running on ${config.APP.PORT}`);
});

const closeGracefully = (signal) => {
  logger.info(`[${signal}] Shutting down gracefully...`);
  server.close();
};

process.on('SIGKILL', closeGracefully);
process.on('SIGTERM', closeGracefully);
process.on('SIGINT', closeGracefully);

module.exports = app;
