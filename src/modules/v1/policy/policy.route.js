const Router = require('express');
const authenticationMiddleware = require('../../../middlewares/auth.middleware');
const validationMiddleware = require('../../../middlewares/validation.middleware');
const { policySchema, consentSchema, fetchConsentSchema } = require('./policy.schema');
const controller = require('./policy.controller');

const router = Router();

router.post('/', authenticationMiddleware(), validationMiddleware(policySchema), controller.postPolicy);

router.post('/consent/:policy_id', authenticationMiddleware(), validationMiddleware(consentSchema), controller.consent);

router.get('/consent/:uid', authenticationMiddleware(), validationMiddleware(fetchConsentSchema), controller.fetchConsent);

module.exports = router;
