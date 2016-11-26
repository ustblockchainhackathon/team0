(function () {
	'use strict';

	angular
		.module('starter.registerPush')
		.factory('NotificationsService', function (DeviceService, NotificationsFactory) {
			var FCMtoken;

			function getPushNotificationToken() {
				if (!DeviceService.isBrowser()) {
					FCMPlugin.getToken(
						function (token) {
							console.log(token);
							FCMtoken = token;
						},
						function (err) {
							console.log('error retrieving token: ' + err);
						}
					)
					FCMPlugin.onNotification(
						function (data) {
							if (data.wasTapped) {
				//Notification was received on device tray and tapped by the user.
								//alert(JSON.stringify(data));
								NotificationsFactory.notification(data);
							} else {
				//Notification was received in foreground. Maybe the user needs to be notified.
								//alert(JSON.stringify(data));
								NotificationsFactory.notification(data);
							}
						},
						function (msg) {
							console.log('onNotification callback successfully registered: ' + msg);
						},
						function (err) {
							console.log('Error registering onNotification callback: ' + err);
						}
					);
				}
			}



			function getToken() {
				return FCMtoken;
			}

			return {
				getPushNotificationToken: getPushNotificationToken,
				getToken: getToken
			};
		});


})();