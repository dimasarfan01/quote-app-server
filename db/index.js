const mongoose = require('mongoose');
const { urlDb } = require('../config');

mongoose.connect(String(urlDb), {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

module.exports = db;
