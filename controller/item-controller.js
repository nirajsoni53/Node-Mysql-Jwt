const mysql = require("mysql");
const connection = require("../database");

exports.save = (req, res) => {
    var post = {
        name: req.body.name,
        discription: req.body.discription,
        categoryId: req.body.categoryId,
    };
    var query = "INSERT INTO ?? SET ?";
    var table = ["item"];
    query = mysql.format(query, table);

    connection.query(query,post,function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Invalid Request" });
        }
        else {
            res.json({ "Error": false, "Message": "Item Created Successfully" });
        }
    });
}
