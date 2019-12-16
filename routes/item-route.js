const express = require('express');
const {save,getItem,getCount} =  require('../controller/item-controller');
const authRouter = express.Router();

authRouter.post('/save',save);
authRouter.post('/getItem',getItem);
authRouter.get('/getCount',getCount);

module.exports=authRouter;