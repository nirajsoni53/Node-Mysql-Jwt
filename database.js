var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'mysql',
    password : 'Last6Sem@Project',
    database : 'beatycare',
    debug    :  true
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;