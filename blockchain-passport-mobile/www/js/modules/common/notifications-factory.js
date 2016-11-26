(function (angular) {
	'use strict';

	angular
		.module('starter.NotificationsFactory')
		.factory('NotificationsFactory', NotificationsFactory);

	function NotificationsFactory($state, SignatureFactory) {

		var factory = [];

		factory.notification = function notification(notificationData) {
			console.log(notificationData);
			SignatureFactory.setSignature(notificationData);
			$state.go('signature');
		}



		return factory;



	}


})(window.angular);
