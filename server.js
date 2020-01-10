var express = require("express");
var bodyParser = require("body-parser");
const cors = require('cors');

var userRoute = require('./routes/user-route');
var authRoute = require('./routes/auth-route');
var createCategoryRoute = require('./routes/create-category-route');
var createItemRoute = require('./routes/create-item-route');
var itemRoute = require('./routes/item-route');
var categoryRoute = require('./routes/category-route');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './uploads' });

var port = process.env.PORT || 5000;

/* App Configuration */
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/api/upload', multipartMiddleware, (req, res) => {
    res.json({ 'message': req.files });
});

/* Router Configuration */
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/admin/category', createCategoryRoute);
app.use('/admin/item', createItemRoute);
app.use('/category', categoryRoute);
app.use('/item', itemRoute);


/* Serevr Start */
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});