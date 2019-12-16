const express = require('express');
const {save,getCategory} =  require('../controller/category-controller');
const authRouter = express.Router();

authRouter.post('/save',save);
authRouter.get('/getCategory',getCategory);

module.exports=authRouter;