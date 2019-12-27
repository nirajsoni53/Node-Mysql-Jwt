const express = require('express');
const {signUp,login,forgotPassword,validPasswordToken,updatePassword} =  require('../controller/auth-controller');
const authRouter = express.Router();

authRouter.post('/signUp',signUp);
authRouter.post('/login',login);
authRouter.get('/forgotPassword/:email',forgotPassword);
authRouter.post('/valid-password-token',validPasswordToken);
authRouter.post('/update-password',updatePassword);
module.exports=authRouter;