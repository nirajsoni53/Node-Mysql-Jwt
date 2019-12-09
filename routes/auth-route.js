const express = require('express');
const {signUp,login} =  require('../controller/auth-controller');
const authRouter = express.Router();

authRouter.post('/signUp',signUp);
authRouter.post('/login',login);

module.exports=authRouter;