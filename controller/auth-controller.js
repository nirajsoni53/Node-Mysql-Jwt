const mysql = require("mysql");
const md5 = require("MD5");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
var nodemailer = require('nodemailer');
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
                res.status(500).send({
                    message: 'wrong email/password combination'
                });
                //res.json({ "error": true, "message": "wrong email/password combination" });
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

function saveResetToken(email, userId, res) {
    let token = crypto.randomBytes(16).toString('hex');
    let query = "INSERT INTO ?? SET ?";
    const post = {
        user_id: userId,
        token: token
    }
    var table = ["reset_token"];
    query = mysql.format(query, table);
    connection.query(query, post, function (err, rows) {
        if (err) {
            res.status(500).json({ message: "Invalid Request" });
        }
        sendMail(email, token);
    });
}

function sendMail(email, token) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'onlinebeautycare2019@gmail.com',
            pass: 'onlinebeauty12345'
        }
    });
    var mailOptions = {
        to: 'darshna.soni53@gmail.com',
        from: 'onlinebeautycare2019@gmail.com',
        subject: 'Beaty Care Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://localhost:4200/auth/new-password/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

exports.forgotPassword = (req, res) => {
    let email = req.params.email;
    if (email == '') {
        return res
            .status(500)
            .json({ message: 'Email is required' });
    }
    let query = "SELECT ??,?? FROM ?? WHERE ?? = ?";
    let table = ["id", "email", "user", "email", email];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (rows.length == 0) {
            return res
                .status(409)
                .json({ message: 'Email does not exist' });
        }
        saveResetToken(email, rows[0].id, res);
        /* return res
            .status(200)
            .json({ message: 'Password Reset Email Send! Please Check Your Email' }); */
    });


}

exports.validPasswordToken = (req, res) => {
    let token = req.body.resettoken;
    if (token == '') {
        return res
            .status(500)
            .json({ message: 'Token is required' });
    }

    let query = "SELECT ?? FROM ?? WHERE ?? = ?";
    let table = ["user_id", "reset_token", "token", token];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (rows.length == 0) {
            return res
                .status(409)
                .json({ message: 'Token does not exist' });
        }
        return res.status(200).json({ message: 'Token verified successfully.' });
    });
}

exports.updatePassword = (req, res) => {
    let token = req.body.token;
    let password = md5(req.body.password);

    if (password == '') {
        return res
            .status(500)
            .json({ message: 'Password is required' });
    }

    let query = "SELECT ?? FROM ?? WHERE ?? = ?";
    let table = ["user_id", "reset_token", "token", token];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (rows.length == 0) {
            return res
                .status(409)
                .json({ message: 'Token does not exist' });
        }
        updatePassword(password, rows[0].user_id,res);
    });
}


function updatePassword(password, id, res) {
    let query = "UPDATE ?? SET ??=? WHERE ??=?"
    let table = ["user", "password", password, "id", id];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        deleteToken(id,res);
    });
}
function deleteToken(id, res){
   
    let query = "DELETE FROM ?? WHERE ??=?"
    let table = ["reset_token", "user_id", id];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        return res.status(200).json({ message: 'Password Updated Successfully.' });
    });
}
