var express = require('express');
// var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();

// var dbconnection = require('./DB/dbconnection');
var rates = require('./Factories/Rates');

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
    // dbconnection.getBtc(startRowNumber, function (btcRes) {
    //     res.send(btcRes);
    // });
    rates.getRates('BTC', startRowNumber).then((snapshot) => {
        var btcRes = {
            isSuccess: true,
            btc: snapshotToArray(snapshot)
        }
        res.send(btcRes);
    }, (err) => {
        console.error('/api/btc/:startRowNumber Error: ' + err + ' ' + 'startRowNumber: ' + startRowNumber + ' ' + new Date());
    });
});

app.get('/api/bch/:startRowNumber', function (req, res) {
    var startRowNumber = parseInt(req.params['startRowNumber']);
    // dbconnection.getBch(startRowNumber, function (bchRes) {
    //     res.send(bchRes);
    // });
    rates.getRates('BCH', startRowNumber).then((snapshot) => {
        var bchRes = {
            isSuccess: true,
            bch: snapshotToArray(snapshot)
        }
        res.send(bchRes);
    }, (err) => {
        console.error('/api/bch/:startRowNumber Error: ' + err + ' ' + 'startRowNumber: ' + startRowNumber + ' ' + new Date());
    });
});

app.get('/api/ltc/:startRowNumber', function (req, res) {
    var startRowNumber = parseInt(req.params['startRowNumber']);
    // dbconnection.getLtc(startRowNumber, function (ltcRes) {
    //     res.send(ltcRes);
    // });
    rates.getRates('LTC', startRowNumber).then((snapshot) => {
        var ltcRes = {
            isSuccess: true,
            ltc: snapshotToArray(snapshot)
        }
        res.send(ltcRes);
    }, (err) => {
        console.error('/api/ltc/:startRowNumber Error: ' + err + ' ' + 'startRowNumber: ' + startRowNumber + ' ' + new Date());
    });
});

app.get('/api/btg/:startRowNumber', function (req, res) {
    var startRowNumber = parseInt(req.params['startRowNumber']);
    // dbconnection.getLtc(startRowNumber, function (ltcRes) {
    //     res.send(ltcRes);
    // });
    rates.getRates('BTG', startRowNumber).then((snapshot) => {
        var btgRes = {
            isSuccess: true,
            btg: snapshotToArray(snapshot)
        }
        res.send(btgRes);
    }, (err) => {
        console.error('/api/btg/:startRowNumber Error: ' + err + ' ' + 'startRowNumber: ' + startRowNumber + ' ' + new Date());
    });
});

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

console.log(port);
app.listen(port);