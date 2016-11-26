'use strict';

var FCM = require("fcm-node");
      
module.exports = (function init() {
	
	return {
		sendPushNotification : function sendPushNotification(request) {
			var fcm = new FCM("AIzaSyAFLPmrnEYr783yZh08pSwBkC9AzUcov_0");
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