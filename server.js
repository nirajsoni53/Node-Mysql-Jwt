var express = require("express");
var bodyParser  = require("body-parser");
const cors = require('cors');

var verifyToken = require('./middleware/verifyToken');
var addNewUser = require('./middleware/addNewUser');
var userLoginCheck = require('./middleware/userLoginCheck');
var findAllUsers = require('./middleware/findAllUsers');
var welcome = require('./middleware/welcome');
var userRoute = require('./routes/user-route');
var authRoute = require('./routes/auth-route');
var createCategoryRoute = require('./routes/create-category-route');
var itemRoute = require('./routes/item-route');
var categoryRoute = require('./routes/category-route');

var port = process.env.PORT || 5000;

//var twilio = require('twilio');
var app  = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/* app.post('/signup', addNewUser);
app.post('/userlogin', userLoginCheck);

var apiRoutes = express.Router();
apiRoutes.use(bodyParser.urlencoded({ extended: true }));
apiRoutes.use(bodyParser.json());
//route middleware to verify a token 
apiRoutes.use(verifyToken);
apiRoutes.get('/', welcome);
apiRoutes.get('/users', findAllUsers);

app.use('/api', apiRoutes); */

app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use('/admin/category',createCategoryRoute);
app.use('/admin/item',itemRoute);
app.use('/category',categoryRoute);

app.listen(port, function() {
    console.log('Express server listening on port ' +port);
});