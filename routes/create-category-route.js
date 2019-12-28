const express = require('express');
const {save,getCategory,getCount} =  require('../controller/create-category-controller');
const createCategoryRouter = express.Router();

createCategoryRouter.post('/save',save);
createCategoryRouter.post('/getCategory',getCategory);
createCategoryRouter.get('/getCount',getCount);

module.exports=createCategoryRouter;