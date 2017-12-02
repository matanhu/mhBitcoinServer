
var firebase = require('../DB/firebase');

function getRates(currencyName, startRowNumber) {
    return firebase.database().ref(currencyName).orderByChild('date').once('value');
}






module.exports.getRates = getRates;