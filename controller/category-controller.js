const mysql = require("mysql");
const connection = require("../database");

exports.saveCategory = (req, res) => {
    var post = {
        salon_id: req.body.salonId,
        category_id: req.body.categoryId,
        created_date: new Date()
    };
    var query = "INSERT INTO ?? SET ?";
    var table = ["salon_category"];
    query = mysql.format(query, table);

    connection.query(query, post, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Invalid Request" });
        }
        else {
            res.json({ "Error": false, "Message": "Category Created Successfully" });
        }
    });
}

exports.getCategory = (req, res) => {
    var query =
        "SELECT DISTINCT ??,?? " +
        "FROM ?? " +
        "INNER JOIN ?? " +
        "ON ?? = ??";
    var table = [
        "category.id", "category.name",
        "category",
        "item",
        "item.categoryId", "category.id"
    ];
    query = mysql.format(query, table);

    connection.query(query, function (err, rows) {
        return res.json(rows);
    });
}

exports.getSalonCategory = (req, res) => {
    var query = "SELECT ??,??,??,?? AS date FROM ?? AS c INNER JOIN ?? AS sc ON ?? = ?? WHERE ?? = ?";
    var table = ["c.id", "c.name", "c.discription", "sc.created_date", "category", "salon_category", "c.id", "sc.category_id", "salon_id", 2];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        return res.json(rows);
    });
}