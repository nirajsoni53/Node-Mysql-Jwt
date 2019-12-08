const mysql   = require("mysql");
const md5 = require("MD5");
const connection = require("../database");

exports.signUp = (req, res) => {
    var post  = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:md5(req.body.password),
    };
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

exports.getByEmail = (req, res) => {

}

exports.saveUser = (req, res) =>{
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