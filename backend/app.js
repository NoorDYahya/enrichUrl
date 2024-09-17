var MongoClient = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

//cors 
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH'); 
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
//To parse URL encoded data
app.use(bodyParser.urlencoded({extended: false}));
//To parse json data
app.use(bodyParser.json());
// for parsing multipart/form-data
app.use(upload.array());

var urls = require('./routers/urlRouter.js');
app.use('/urls',urls); 

app.get('*',function(req,res){
  res.send('Sorry, this is an invalid URL.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});