'use strict';

var FCM = require("fcm-node");
      
module.exports = (function init() {
	
	return {
		sendPushNotification : function sendPushNotification(request) {
//			var fcm = new FCM("AIzaSyAFLPmrnEYr783yZh08pSwBkC9AzUcov_0");
var fcm = new FCM("AIzaSyDbDw7kNIzHWNDP8H8b8oFxpYn8msNr1OY");
			fcm.send(request.toPushNotification(), function (err, response) {
				if (err) {
					console.log(request.getRequestId() + " Could not send the push notification " + err.toString() + " " + err);
				} else {
					console.log(request.getRequestId() + " Successfully sent push notification with response: ", response);
				}
			});
		}
	};
})();