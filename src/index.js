/* eslint-disable global-require */
const config = require('config');
const fs = require('fs');
const path = require('path');
const {
  logger,
} = require('./util/logger');
const { connectDB } = require('./util/database');

const bootstrap = async () => {
  try {
    await connectDB();
    config.MODULE.AUTH.JWT_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../config/private.key'), 'utf-8');
    config.MODULE.AUTH.JWT_PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../config/public.key'), 'utf-8');
    require('./app');
  } catch (error) {
    logger.error(error.message);
  }
};

bootstrap();
