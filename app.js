/**
 * Small snippit of code to serve the page through node
 */

var path = require('path');
var express = require('express');
var app = express();

app.use(express.static("."));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});
