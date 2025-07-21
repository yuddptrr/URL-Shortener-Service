const express = require('express');
const router = express.Router();
const { handleRedirect } = require('../controllers/urlController');

router.get('/:shortCode', handleRedirect);

module.exports = router;