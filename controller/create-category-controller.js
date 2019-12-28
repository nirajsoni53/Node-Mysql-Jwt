const mysql = require("mysql");
const connection = require("../database");

exports.save = (req, res) => {
    var post = {
        name: req.body.name,
        discription: req.body.discription,
    };
    var query = "INSERT INTO ?? SET ?";
    var table = ["category"];
    query = mysql.format(query, table);

    connection.query(query,post,function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Invalid Request" });
        }
        else {
            res.json({ "Error": false, "Message": "Category Created Successfully" });
        }
    });
}


exports.getCategory = (req, res) => {
    var paginationData = {
        currentPage: req.body.currentPage,
        numberOfRecords: req.body.numberOfRecords
    };
    var query = "SELECT * FROM ?? LIMIT ?,?";
    var table = ["category",paginationData.currentPage,paginationData.numberOfRecords];
    query = mysql.format(query, table);
    
    connection.query(query,function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Invalid Request" });
        }
        else {
            res.json(rows);
        }
    });
}

exports.getCount = (req, res) => {

    var query = "SELECT COUNT(??) AS count  FROM ??";
    var table = ["id","category"];
    query = mysql.format(query, table);

    connection.query(query,function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Invalid Request" });
        }
        else {
            res.json(rows[0]);
        }
    });
}
