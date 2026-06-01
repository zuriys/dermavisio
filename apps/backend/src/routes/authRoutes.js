const express = require('express');
const router = express.Router();
const { registerHandler, loginHandler } = require('../handlers/authHandler');

router.post('/register', registerHandler);
router.post('/login', loginHandler);

module.exports = router;