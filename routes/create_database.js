
const mysql = require('mysql');

//create database function 
module.exports.createdb = function(dbname){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
      });

      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("CREATE DATABASE if not exists "+ dbname, function (err, result) {
          if (err) throw err;
          console.log("Database created");
        });
      });

      
}


