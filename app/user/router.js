const express = require('express');
const { checkExistedEmail } = require('./controller');

const router = express.Router();
router.post('/check-email', checkExistedEmail);

module.exports = router;
