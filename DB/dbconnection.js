var mysql = require('mysql');  
// var db_config = {
//     host: '10.0.0.8',  
    //     user: 'matanBitcoin',  
    //     password: '01111987',  
    //     database: 'MhBitcoin' 
// }; 

var db_config = {
    host: 'eu-cdbr-west-01.cleardb.com',  
    user: 'bc609a61f37ad2',  
    password: '86fb0950',  
    database: 'heroku_aae3b5c7cd921c3'  
}; 

var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
}

handleDisconnect();

function connectDB(query, values, callback) {
    try {
        connection.query(query,values, function(error, rows, fields) {
            callback(error, rows, fields);
        });
    } catch(ex) {
        console.log(ex);
        callback(ex, null, null);
    }
}

function getBtc(startKey, callback) {
    // dbConnection.connectDB('SELECT * FROM BagPlot.Project;', 
    connectDB(`SELECT * FROM b2c_btc order by date desc limit ?, ?;`,
        [startKey, startKey + 100],
        function (error, rows, fields) {
            if (!!error) {
                var res = {
                    isSuccess: false,
                    btc: rows
                }
                console.error("getBtc: " + error);
                callback(res);
            } else {
                var res = {
                    isSuccess: true,
                    btc: rows
                }
                callback(res);
            }
        }
    );
}

function getBch(startKey, callback) {
    // dbConnection.connectDB('SELECT * FROM BagPlot.Project;', 
    connectDB(`SELECT * FROM b2c_bch order by date desc limit ?, ?;`,
        [startKey, startKey + 100],
        function (error, rows, fields) {
            if (!!error) {
                var res = {
                    isSuccess: false,
                    bch: rows
                }
                console.error("getBtc: " + error);
                callback(res);
            } else {
                var res = {
                    isSuccess: true,
                    bch: rows
                }
                callback(res);
            }
        }
    );
}

function getLtc(startKey, callback) {
    // dbConnection.connectDB('SELECT * FROM BagPlot.Project;', 
    connectDB(`SELECT * FROM b2c_ltc order by date desc limit ?, ?;`,
        [startKey, startKey + 100],
        function (error, rows, fields) {
            if (!!error) {
                var res = {
                    isSuccess: false,
                    ltc: rows
                }
                console.error("getBtc: " + error);
                callback(res);
            } else {
                var res = {
                    isSuccess: true,
                    ltc: rows
                }
                callback(res);
            }
        }
    );
}

module.exports.connectDB = connectDB;
module.exports.getBtc = getBtc;
module.exports.getBch = getBch;
module.exports.getLtc = getLtc;