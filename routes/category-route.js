const express = require('express');
const {save} =  require('../controller/category-controller');
const authRouter = express.Router();

authRouter.post('/save',save);

module.exports=authRouter;