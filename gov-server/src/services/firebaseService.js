'use strict';

const FCM = require("fcm-node"),
      configService = require('../config/configService.js');
      
module.exports = (function init() {
	
	return {
		sendPushNotification : function sendPushNotification(request) {
			var fcm = new FCM(configService.getParam('firebaseKey'));
			fcm.send(request.toPushNotification(), function (err, response) {
				if (err) {
					log.error(request.requestId + " Could not send the push notification " + err.toString());
				} else {
					log.info(request.requestId + " Successfully sent push notification with response: ", response);
				}
			});
		}
	};
})();