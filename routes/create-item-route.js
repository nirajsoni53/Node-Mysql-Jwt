const express = require('express');
const {save,getItem,getCount} =  require('../controller/create-item-controller');
const itemRouter = express.Router();

itemRouter.post('/save',save);
itemRouter.post('/getItem',getItem);
itemRouter.get('/getCount',getCount);
module.exports=itemRouter;