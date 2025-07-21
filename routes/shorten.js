const express = require('express');
const router = express.Router();
const { createShortUrl, showHomePage } = require('../controller/urlcontroller');

router.get('/', showHomePage);
router.post('/shorten', createShortUrl);

module.exports = router;