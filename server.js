var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();

var dbconnection = require('./DB/dbconnection');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

var port = Number(process.env.PORT || 3000);

app.get('/', function (req, res) {
    dbconnection.getBtc(0, function (btcRes) {
        res.send("asdasdasd");
    });
});

app.get('/api/btc/:startRowNumber', function (req, res) {
    var startRowNumber = parseInt(req.params['startRowNumber']);
    dbconnection.getBtc(startRowNumber, function (btcRes) {
        res.send(btcRes);
    });
});

app.get('/api/bch/:startRowNumber', function (req, res) {
    var startRowNumber = parseInt(req.params['startRowNumber']);
    dbconnection.getBch(startRowNumber, function (bchRes) {
        res.send(bchRes);
    });
});

app.get('/api/ltc/:startRowNumber', function (req, res) {
    var startRowNumber = parseInt(req.params['startRowNumber']);
    dbconnection.getLtc(startRowNumber, function (ltcRes) {
        res.send(ltcRes);
    });
});

console.log(port);
app.listen(port);