const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { logger } = require('../util/logger');

const isDirectory = (folder, source) => {
  return fs.lstatSync(path.join(folder, source)).isDirectory();
};

const setupRoutes = () => {
  fs.readdirSync(__dirname).filter((subDir) => isDirectory(__dirname, subDir)).forEach(version => {
    const moduleRouter = express.Router();
    const currentDir = path.join(__dirname, version);
    fs.readdirSync(currentDir).filter((subDir) => isDirectory(currentDir, subDir)).forEach(module => {
      const routeFilePath = `./${version}/${module}/${module}.route`;
      moduleRouter.use(`/${module}`, require(routeFilePath));
      logger.info(`Loaded API: ${version}/${module}`);
    })
    router.use(`/${version}`, moduleRouter);
  })
  return router;
}

module.exports = setupRoutes;