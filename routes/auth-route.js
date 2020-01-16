const express = require('express');
const {signUp,login,forgotPassword,validPasswordToken,updatePassword} =  require('../controller/auth-controller');
const authRouter = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './uploads' });

authRouter.post('/signUp',multipartMiddleware,signUp);
authRouter.post('/login',login);
authRouter.get('/forgotPassword/:email',forgotPassword);
authRouter.post('/valid-password-token',validPasswordToken);
authRouter.post('/update-password',updatePassword);
module.exports=authRouter;