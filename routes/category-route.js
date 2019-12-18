const express = require('express');
const {save,getCategory,getCount} =  require('../controller/category-controller');
const authRouter = express.Router();

authRouter.post('/save',save);
authRouter.post('/getCategory',getCategory);
authRouter.get('/getCount',getCount);

module.exports=authRouter;