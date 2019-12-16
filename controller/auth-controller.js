const mysql = require("mysql");
const md5 = require("MD5");
var jwt = require('jsonwebtoken');
var config = require('../config');
const connection = require("../database");

exports.signUp = (req, res) => {
    var post = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: md5(req.body.password),
    };
    var query = "SELECT email FROM ?? WHERE ??=?";

    var table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Invalid Request" });
        }
        else {
            if (rows.length == 0) {
                saveUser(res, post);
            }
            else {
                res.json({ "Error": false, "Message": "Email Id already registered" });
            }
        }
    });
}

exports.login = (req, res) => {
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT ??,??,??,?? FROM ?? WHERE ??=? AND ??=?";

    var table = [
        "email",
        "firstName",
        "lastName",
        "type",
        "user",
        "password",
        md5(post.password),
        "email",
        post.email
    ];

    query = mysql.format(query, table);

    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "error": true, "message": "Error executing MySQL query" });
        }
        else {

            if (rows.length == 1) {
                var token = jwt.sign(rows, config.secret, {
                    expiresIn: 1440
                });

                res.json({
                    error: false,
                    message: 'Token generated',
                    token: token,
                    currUser: rows[0]
                });
            }
            else {
                res.json({ "error": true, "message": "wrong email/password combination" });
            }
        }
    });
}

function saveUser(res, post) {
    var query = "INSERT INTO ?? SET ?";
    var table = ["user"];
    query = mysql.format(query, table);
    connection.query(query, post, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Invalid Request" });
        } else {
            res.json({ "Error": false, "Message": "Registration Success" });
        }
    });
}