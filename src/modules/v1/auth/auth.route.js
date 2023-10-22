const Router = require('express');
const controller = require('./auth.controller')

const router = Router();

router.get('/token', controller.getToken);

module.exports = router;