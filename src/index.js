/* eslint-disable global-require */
const {
  logger,
} = require('./util/logger');
const { connectDB } = require('./util/database');

const bootstrap = async () => {
  try {
    await connectDB();
    require('./app');
  } catch (error) {
    logger.error(error.message);
  }
};

bootstrap();
