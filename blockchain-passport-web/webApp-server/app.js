const express = require('express'),
    path = require('path'),
    app = express();

app.use(express.logger());

app.use(express.json());       
app.use(express.urlencoded());


app.use("/dist", express.static(__dirname + '/dist'));
app.use("/styles", express.static(__dirname + '/dist/styles/'));
app.use("/scripts", express.static(__dirname + '/dist/scripts'));
app.use("/resources", express.static(__dirname + '/dist/resources'));
app.use("/components/menu", express.static(__dirname + '/dist/components/menu'));
app.use("/components/login", express.static(__dirname + '/dist/components/login'));
app.use("/components/register", express.static(__dirname + '/dist/components/register'));
//app.use("/bower_components",  express.static(__dirname + '/dist/bower_components'));

app.get('/passport', function (req, res) {
	res.sendfile(path.join(__dirname + '/dist/index.html'));
});

app.listen(3001, function () {
	console.log('Passport POC listening on port 3001');
});