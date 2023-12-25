const config = require('config');
const mongoose = require('mongoose');
const { logger } = require('../logger');
const { setupModels } = require('../../models');

const connectDB = async () => {
  const url = config.DB.URI;
  try {
    await mongoose.connect(url, config.DB.CONFIG);
    logger.info('Database connected');
    setupModels();
  } catch (error) {
    console.log(error);
    logger.error(error.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;

  dbConnection.on('error', (error) => {
    logger.error(error.message);
  });
};

module.exports = {
  connectDB,
};
