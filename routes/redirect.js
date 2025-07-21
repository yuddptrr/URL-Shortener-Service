const express = require('express');
const router = express.Router();
const { handleRedirect } = require('../controller/urlcontroller');

router.get('/:shortCode', handleRedirect);

module.exports = router;