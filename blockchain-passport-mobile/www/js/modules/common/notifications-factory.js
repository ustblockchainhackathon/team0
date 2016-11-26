(function (angular) {
	'use strict';

	angular
		.module('starter.NotificationsFactory')
		.factory('NotificationsFactory', NotificationsFactory);

	function NotificationsFactory($state) {

		var factory = [];

		factory.notification = function notification(notificationData) {
			console.log(notificationData);
			
			$state.go('signature');
		}



		return factory;



	}


})(window.angular);
