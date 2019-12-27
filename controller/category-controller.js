const mysql = require("mysql");
const connection = require("../database");

exports.save = (req, res) => {
    
}

exports.getCategory = (req, res) => {
    var query = "SELECT ??,?? FROM ??";
    var table = ["id","name","category"];
    query = mysql.format(query, table);
    
    connection.query(query,function (err, rows) {
        return res.json(rows);
    });
}
