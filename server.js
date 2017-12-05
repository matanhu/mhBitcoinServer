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

app.get('/api/btc/:startKey', function (req, res) {
    var startKey = parseInt(req.params['startKey']);
    // dbconnection.getBtc(startKey, function (btcRes) {
    //     res.send(btcRes);
    // });
    rates.getRates('BTC', startKey).then((snapshot) => {
        var btcRes = {
            isSuccess: true,
            btc: snapshotToArray(snapshot)
        }
        res.send(btcRes);
    }, (err) => {
        console.error('/api/btc/:startKey Error: ' + err + ' ' + 'startKey: ' + startKey + ' ' + new Date());
    });
});

app.get('/api/bch/:startKey', function (req, res) {
    var startKey = parseInt(req.params['startKey']);
    // dbconnection.getBch(startKey, function (bchRes) {
    //     res.send(bchRes);
    // });
    rates.getRates('BCH', startKey).then((snapshot) => {
        var bchRes = {
            isSuccess: true,
            bch: snapshotToArray(snapshot)
        }
        res.send(bchRes);
    }, (err) => {
        console.error('/api/bch/:startKey Error: ' + err + ' ' + 'startKey: ' + startKey + ' ' + new Date());
    });
});

app.get('/api/ltc/:startKey', function (req, res) {
    var startKey = parseInt(req.params['startKey']);
    // dbconnection.getLtc(startKey, function (ltcRes) {
    //     res.send(ltcRes);
    // });
    rates.getRates('LTC', startKey).then((snapshot) => {
        var ltcRes = {
            isSuccess: true,
            ltc: snapshotToArray(snapshot)
        }
        res.send(ltcRes);
    }, (err) => {
        console.error('/api/ltc/:startKey Error: ' + err + ' ' + 'startKey: ' + startKey + ' ' + new Date());
    });
});

app.get('/api/btg/:startKey', function (req, res) {
    var startKey = parseInt(req.params['startKey']);
    // dbconnection.getLtc(startKey, function (ltcRes) {
    //     res.send(ltcRes);
    // });
    rates.getRates('BTG', startKey).then((snapshot) => {
        var btgRes = {
            isSuccess: true,
            btg: snapshotToArray(snapshot)
        }
        res.send(btgRes);
    }, (err) => {
        console.error('/api/btg/:startKey Error: ' + err + ' ' + 'startKey: ' + startKey + ' ' + new Date());
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