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

exports.getItem = (req, res) => {
    var paginationData = {
        currentPage: req.body.currentPage,
        numberOfRecords: req.body.numberOfRecords
    };

    var search ={
        name: req.body.search.name,
        discription: req.body.search.discription
    }

    var query = "SELECT * FROM ??";

    var table = ["item"];

    if(search.name != '' || search.discription != ''){
        query = query.concat(' WHERE');
    }
 
    if(search.name != '' && search.discription == ''){
        query = query.concat(' ?? LIKE ?');
        table.push("name");
        table.push("%"+search.name+"%");
    }
    else if(search.name == '' && search.discription != ''){
        query = query.concat(' ?? LIKE ?');
        table.push("discription");
        table.push("%"+search.discription+"%");
    }
    else if(search.name != '' && search.discription != '')
    {
        query = query.concat(' ?? LIKE ? AND ?? LIKE ?');
        table.push("name");
        table.push("%"+search.name+"%");
        table.push("discription");
        table.push("%"+search.discription+"%");
    }

    query = query.concat(' LIMIT ?,?');
    table.push(paginationData.currentPage);
    table.push(paginationData.numberOfRecords);
    
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
    var table = ["id","item"];
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


