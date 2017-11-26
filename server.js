var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();

var dbconnection = require('./DB/dbconnection');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = Number(process.env.PORT || 3000);

app.get('/api/btc', function (req, res) {
    dbconnection.getBtc(function (btcRes) {
        res.send(btcRes);
    });
});

app.get('/api/bch', function (req, res) {
    dbconnection.getBch(function (bchRes) {
        res.send(bchRes);
    });
});

console.log(port);
app.listen(port);