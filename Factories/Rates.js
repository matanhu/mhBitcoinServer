
var firebase = require('../DB/firebase');


module.exports = {
    getRates: function (currencyName, startKey) {
        if (startKey !== 0) {
            return firebase.database().ref(currencyName).orderByChild('order').startAt(startKey).limitToFirst(30).once('value');
        }
        return firebase.database().ref(currencyName).orderByChild('order').limitToFirst(30).once('value');
    },
    getNotifications: function() {
        return firebase.database().ref('MessageNotification').orderByChild('order').limitToFirst(30).once('value');
    }
}