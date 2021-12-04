const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const user = require('./app/user/router');
const auth = require('./app/auth/router');
const quote = require('./app/quote/router');
const app = express();
const API_URL = '/api/v1';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// app.use(`${API_URL}/user`, user);
app.use(`${API_URL}/auth`, auth);
app.use(`${API_URL}/user`, user);
app.use(`${API_URL}/quote`, quote);

module.exports = app;
