const Router = require('express');
const controller = require('./auth.controller');
const authenticationMiddleware = require('../../../middlewares/auth.middleware');
const validationMiddleware = require('../../../middlewares/validation.middleware');
const { validateTokenSchema, loginSchema, registerSchema } = require('./auth.schema');

const router = Router();

router.get('/token/validate', authenticationMiddleware(), validationMiddleware(validateTokenSchema), controller.populateToken);

router.post('/authenticate', validationMiddleware(loginSchema), controller.authenticate);

router.post('/entity/register', authenticationMiddleware(), validationMiddleware(registerSchema), controller.register);

module.exports = router;
