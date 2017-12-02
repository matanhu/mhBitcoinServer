
var firebase = require('../DB/firebase');

function getRates(currencyName, startRowNumber) {
    return firebase.database().ref(currencyName).orderByChild('order').once('value');
}






module.exports.getRates = getRates;