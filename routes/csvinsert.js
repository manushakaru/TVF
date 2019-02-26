
var fs = require('fs')
var csv = require('fast-csv')
var mysql = require('mysql')

module.exports.insert = function(path,dbname,tbname){
    let stream = fs.createReadStream(path);
    let myData = [];

    let csvStream = csv
        .parse()
        .on("data", function (data) {
            myData.push(data);
        })
        .on("end", function () {
            myData.shift();
            
            // create a new connection to the database
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: dbname
            });

            // open the connection
            connection.connect((error) => {
                if (error) {
                    console.error(error);
                } else {
                    let query = 'INSERT INTO ' +tbname+ ' ( medallion,pickuptime,dropofftime,passengers,pickupx,pickupy,dropoffx,dropoffy,fare,paymenttype,surcharge,mtatax,tip,tolls,total) VALUES ?';
                    let query2 = 'drop table if exists ' + tbname + ' ';
                    var sql = "CREATE TABLE if not exists " +tbname+ " ( medallion varchar(255),pickuptime varchar(255),dropofftime varchar(255),passengers varchar(255) ,pickupx varchar(255) ,pickupy varchar(255) ,dropoffx varchar(255) ,dropoffy varchar(255) ,fare varchar(255) ,paymenttype varchar(255) ,surcharge varchar(255) ,mtatax varchar(255) ,tip varchar(255) ,tolls varchar(255) ,total varchar(255))";
                    connection.query(query2,(error, response) => {
                        console.log(error || response);
                    });
                    
                    connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Table created");
                    });

                    // medallion,pickuptime,dropofftime,passengers,pickupx,pickupy,dropoffx,dropoffy,fare,paymenttype,surcharge,mtatax,tip,tolls,total
                   
                    
                    connection.query(query, [myData], (error, response) => {
                        console.log(error || response);
                    });
                }
            });
        });

    stream.pipe(csvStream);

}

