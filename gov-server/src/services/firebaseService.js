'use strict';

var FCM = require("fcm-node");
      
module.exports = (function init() {
	
	return {
		sendPushNotification : function sendPushNotification(request) {
			var fcm = new FCM("AIzaSyDbDw7kNIzHWNDP8H8b8oFxpYn8msNr1OY");
			fcm.send(request.toPushNotification(), function (err, response) {
				if (err) {
					console.log(request.requestId + " Could not send the push notification " + err.toString());
				} else {
					console.log(request.requestId + " Successfully sent push notification with response: ", response);
				}
			});
		}
	};
})();