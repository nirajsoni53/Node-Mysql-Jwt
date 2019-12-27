const express = require('express');
const {save,getCategory} =  require('../controller/category-controller');
const categoryRouter = express.Router();

categoryRouter.post('/save',save);
categoryRouter.get('/getCategory',getCategory);

module.exports=categoryRouter;