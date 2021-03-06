var express = require("express");
var app = express();
var moment = require("moment");
var dbOperations = require("./public/js/dbOperations.js");
    

app.use('/node_modules', express.static(__dirname + '/node_modules/'));

app.set('port', (process.env.PORT || 5000));

app.post('/', function(req,res){
    console.log('hello world');
	dbOperations.register(req,res);
});


app.use(express.static(__dirname + '/public'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('/public/index.html', { root: __dirname });
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


