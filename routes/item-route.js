const express = require('express');
const {save} =  require('../controller/item-controller');
const authRouter = express.Router();

authRouter.post('/save',save);

module.exports=authRouter;