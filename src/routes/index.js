const express = require('express');
const router = express.Router();

const index = require('../api/controllers/home');
const user = require('../api/controllers/user');

// Middleware
const middleware = require('../api/secure/middleware');

router.get('/', index.homepage);
router.get('/login', user.login);
router.get('/register', user.register);
router.post('/register', middleware.reg_valid, user.registerUser);

module.exports = router;