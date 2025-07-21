const express = require('express');
const router = express.Router();
const { createShortUrl, showHomePage } = require('../controllers/urlController');

router.get('/', showHomePage);
router.post('/shorten', createShortUrl);

module.exports = router;