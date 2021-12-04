const express = require('express');
const router = express.Router();
const {
  postQuote,
  getQuote,
  postLikeQuote,
  updateQuote,
  deleteQuoteById,
  getQuoteById,
} = require('./controller');
const multer = require('multer');
const { isLoginUser } = require('../middleware/auth');
const upload = multer({
  limits: { fieldSize: 1024 * 1024 },
});

router.post('/post', isLoginUser, upload.none(), postQuote);
router.post('/like/:id', isLoginUser, postLikeQuote);

router.put('/update/:id', isLoginUser, upload.none(), updateQuote);

router.delete('/delete/:id', isLoginUser, deleteQuoteById);

router.get('/get', getQuote);
router.get('/get/:id', getQuoteById);

module.exports = router;
