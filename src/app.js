const express = require('express');
const config = require('config');
const { logger } = require('./util/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(require("morgan")("combined", { "stream": logger.stream }));

app.get('/health-check', (req, res) => {
    res.status(200).json({message: 'Server healthy.'});
});

module.exports = app;