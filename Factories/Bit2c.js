var bit2c = require('bit2c');

var credentials = {
    key: 'cb2aaa80-702e-40a1-a9a6-c5a80d0f8bd4',
    secret: 'CBFD22E1BFADA923DB4BA569F57E1636CDF4B5707AEB295B29776FF1F4FE8911'
}

var pairList = ['BtcNis', 'BchNis', 'LtcNis', 'BcgNis'];

module.exports = {
    getBalance: function () {
        return new Promise((resolve, reject) => {
            bit2c.getBalance(credentials, function (error, balance) {
                if (error) {
                    reject(error);
                } else {
                    getAllCryptoNis().then(
                        (rates) => {
                            var balanceRates = {
                                balance: balance,
                                rates: rates
                            }
                            resolve(balanceRates);
                        }, (error) => {
                            console.error(error);
                        });
                }
            });
        });
    },
    myOrders: function () {
        return new Promise((resolve, reject) => {
            bit2c.getMyOrders(credentials, "all", function (error, myOrders) {
                if (error) {
                    console.error("myOrders Error: " + error);
                    reject(error);
                } else {
                    resolve(myOrders)
                }
            });
        })
    },
    cancelOrder: function (orderId) {
        return new Promise((resolve, reject) => {
            bit2c.cancelOrder(credentials, orderId, function (error, cancelRes) {
                if (error) {
                    console.error("cancelOrder Error: " + error);
                    console.error("cancelOrder orderId: " + orderId);
                    reject(error);
                } else {
                    resolve(cancelRes);
                }
            });
        });
    },
    addOrder: function (order) {
        return new Promise((resolve, reject) => {
            bit2c.addOrder(credentials, order, function (error, orderRes) {
                if (error) {
                    console.error("addOrder Error: " + error);
                    console.error("order: " + order);
                    reject(error);
                } else {
                    resolve(orderRes);
                }
            })
        });
    }
}

function getCryptoNis(cryptoType) {
    return new Promise((resolve, reject) => {
        bit2c.getTicker(cryptoType + 'Nis', function (error, ticker) {
            if (error) {
                reject("getCryptoNis Error: " + cryptoType + ' ' + error);
            } else {
                resolve(ticker);
            }
        });
    })
}

function getAllCryptoNis() {
    return new Promise((resolve, reject) => {
        getCryptoNis('Btc').then(
            (btc) => {
                getCryptoNis('Bch').then(
                    (bch) => {
                        getCryptoNis('Ltc').then(
                            (ltc) => {
                                getCryptoNis('Btg').then(
                                    (btg) => {
                                        var rates = {
                                            btc: btc,
                                            bch: bch,
                                            ltc: ltc,
                                            btg: btg
                                        };
                                        resolve(rates);
                                    }, (error) => {
                                        reject();
                                    });
                            }, (error) => {
                                reject();
                            });
                    }, (error) => {
                        reject();
                    });
            }, (error) => {
                reject();
            });
    });
}

function getOneOrder(cryptoType) {
    return new Promise((resolve, reject) => {
        bit2c.getMyOrders(credentials, cryptoType, function (error, myOrder) {
            if (error) {
                reject("getOneOrder Error: " + cryptoType + ' ' + error);
            } else {
                resolve(myOrder);
            }
        });
    });
}

function getAllOrders() {
    return new Promise((resolve, reject) => {
        getOneOrder('Btc').then(
            (btc) => {
                getOneOrder('Bch').then(
                    (bch) => {
                        getOneOrder('Ltc').then(
                            (ltc) => {
                                getOneOrder('Btg').then(
                                    (btg) => {
                                        var rates = {
                                            btc: btc,
                                            bch: bch,
                                            ltc: ltc,
                                            btg: btg
                                        };
                                        resolve(rates);
                                    }, (error) => {
                                        reject();
                                    });
                            }, (error) => {
                                reject();
                            });
                    }, (error) => {
                        reject();
                    });
            }, (error) => {
                reject();
            });
    });
}



