const mysql = require("mysql");
const connection = require("../database");

exports.save = (req, res) => {
    var post = {
        name: req.body.name,
        discription: req.body.discription
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
