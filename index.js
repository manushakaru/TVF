var express = require('express');
var app = express();
var multer = require('multer');

//database connection 
var database = require('./routes/create_database')
var csvinsert = require('./routes/csvinsert')

//create database 
database.createdb('csvdb');



//set the path to upload file using multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/project/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname  )
  }
})
var upload = multer({ storage: storage })


app.get('/',function(req,res){
  res.sendFile('home.html', {root:__dirname})
})



//save uploaded file in a destination 
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  console.log(req.file.path)
  csvinsert.insert(req.file.path,'csvdb','csvdata')
  // const fileRows = [];

  // // open uploaded file
  // csv.fromPath(req.file.path)
  //   .on("data", function (data) {
  //     fileRows.push(data); // push each row
  //   })
  //   .on("end", function () {
  //     console.log(fileRows[0])
  //     //console.log(fileRows); //contains array of arrays.
  //     //fs.unlinkSync(req.file.path);   // remove temp file
  //     //process "fileRows" and respond
  //   })

})



//server starting
app.listen(8080,function(){
  console.log('server started on port 8080')
})
