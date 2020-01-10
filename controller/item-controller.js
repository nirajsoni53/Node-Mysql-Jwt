const mysql = require("mysql");
const connection = require("../database");

exports.getSalonItem = (req, res) => {

    var query = "SELECT ??,??,??,??,?? " +
        "FROM ?? as si " +
        "INNER JOIN ?? as c on ?? = ?? " +
        "INNER JOIN ?? AS i ON ?? = ?? " +
        "WHERE ?? = ?";
    var table = [
        "si.id", "i.name", "si.price", "si.date", "i.discription",
        "salon_item",
        "category", "si.category_id", "c.id",
        "item", "si.item_id", "i.id",
        "si.user_id", 2
    ];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        return res.json(rows);
    });

}

exports.getItemByCategoryId = (req, res) => {
    var query = "SELECT ??, ?? " +
        " FROM ??" +
        " WHERE ?? = ?";
    var table = ["item.id", "item.name",
        "item",
        "item.categoryId", req.params.categoryId,
    ];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        return res.json(rows);
    });
}

exports.saveItem = (req, res) => {
    var post = {
        category_id:req.body.categoryId,
        item_id:req.body.itemId,
        price:req.body.price,
        user_id:req.body.userId,
        date: new Date()
    };
    var query = "INSERT INTO ?? SET ?";
    var table = ["salon_item"];
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
