const express = require('express');
const router = express.Router();
const { handlePredict } = require('../handlers/predictHandler');

router.post('/', handlePredict);

module.exports = router;