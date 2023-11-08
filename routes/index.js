const express = require('express');
const notesr = require('./notes');

const app = express();

app.use('/notes',  notesr);

module.exports = app;