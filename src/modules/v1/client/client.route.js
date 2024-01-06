const Router = require('express');
const authenticationMiddleware = require('../../../middlewares/auth.middleware');
const validationMiddleware = require('../../../middlewares/validation.middleware');
const { dashboardSchema } = require('./client.schema');
const controller = require('./client.controller');

const router = Router();

router.get('/dashboard', authenticationMiddleware(), validationMiddleware(dashboardSchema), controller.dashboard);

module.exports = router;
