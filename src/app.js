const config = require('config');
const { logger } = require('./util/logger');
const setupRoutes = require('./modules');

const express = require('express');
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(require("morgan")("combined", { "stream": logger.stream }));

app.use('/', setupRoutes());

app.get('/health-check', (_req, res) => {
    res.status(200).json({ message: 'Server healthy.' });
});

app.use((data, _req, res, _next) => res.json({ data, is_success: true }));

app.use('*', (_req, res) => {
    res.status(404).json({ error: { message: 'Not Found' }, is_success: false });
})

module.exports = app;