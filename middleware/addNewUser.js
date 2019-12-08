
var mysql   = require("mysql");
var express = require("express");
var md5 = require("MD5");
var connection = require("../database");


 var addNewUser = function(req,res, next){
    var post  = {
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      password:md5(req.body.password),
      
  };
  console.log(post);
  		var query = "SELECT email FROM ?? WHERE ??=?";

		var table = ["user", "email", post.email];

		query = mysql.format(query,table);

		connection.query(query,function(err,rows){
		if(err) {
			res.json({"Error" : true, "Message" : "Error executing MySQL query"});
		}
		else {

		if(rows.length==0){

			var query = "INSERT INTO  ?? SET  ?";
			var table = ["user"];
			query = mysql.format(query,table);
			connection.query(query, post, function(err,rows){
				if(err) {
					res.json({"Error" : true, "Message" : "Error executing MySQL query"});
				} else {
					res.json({"Error" : false, "Message" : "Success"});
				}
			});

		}
		else{
			res.json({"Error" : false, "Message" : "Email Id already registered"});
		}
		}
    });
	}

   module.exports = addNewUser;


