const express = require('express');
const router = express.Router();
const { signup, signin } = require('./controller');
const multer = require('multer');
const upload = multer({
  limits: { fieldSize: 1024 * 1024 },
});

router.post('/signup', upload.none(), signup);
router.post('/signin', signin);

module.exports = router;
