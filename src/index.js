const app = require('./app');
const { logger } = require('./util/logger');
const config = require('config');

const server = app.listen(config.APP.PORT, (err) => {
    if(!err) logger.info(`Server running on ${config.APP.PORT}`);
})