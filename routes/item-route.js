const express = require('express');
const { getSalonItem, getItemByCategoryId,saveItem} = require('../controller/item-controller');
const itemRouter = express.Router();

itemRouter.get('/getSalonItem', getSalonItem);
itemRouter.post('/saveItem', saveItem);
itemRouter.get('/getItemByCategoryId/:categoryId', getItemByCategoryId);

module.exports = itemRouter;