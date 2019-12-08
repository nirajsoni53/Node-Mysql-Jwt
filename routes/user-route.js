const express = require('express');
const verifyToken = require('./middleware/verifyToken');
const router = express.Router();

/**
 * Added Middleware
 * When user route called first it will verify token
 * before serve any request
 */

router.use(verifyToken);

