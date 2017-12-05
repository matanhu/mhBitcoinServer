
var firebase = require('../DB/firebase');

function getRates(currencyName, startKey) {
    if(startKey !== 0) {
        return firebase.database().ref(currencyName).orderByChild('order').startAt(startKey).limitToFirst(30).once('value');    
    }
    return firebase.database().ref(currencyName).orderByChild('order').limitToFirst(30).once('value');
}






module.exports.getRates = getRates;