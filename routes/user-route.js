const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const {signUp} =  require('../controller/user-controller');
const userRouter = express.Router();

/**
 * Added Middleware
 * When user route called first it will verify token
 * before serve any request
 */

//userRouter.use(verifyToken);

//userRouter.post('/signUp',signUp);

module.exports=userRouter;
