const express = require('express');
const {saveCategory,getCategory,getSalonCategory} =  require('../controller/category-controller');
const categoryRouter = express.Router();

categoryRouter.post('/saveCategory',saveCategory);
categoryRouter.get('/getCategory',getCategory);
categoryRouter.get('/getSalonCategory',getSalonCategory);
module.exports=categoryRouter;