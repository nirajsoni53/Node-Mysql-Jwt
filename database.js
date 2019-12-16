var mysql = require('mysql');

/* var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'mysql',
    password : 'Last6Sem@Project',
    database : 'beatycare',
    debug    :  true
}); */

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'online-beaty-care',
    debug    :  true
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;