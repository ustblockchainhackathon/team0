(function (angular) {
	'use strict';

	angular
		.module('starter.NotificationsFactory')
		.factory('NotificationsFactory', NotificationsFactory);

	function NotificationsFactory($state,$http) {

		var factory = [];
        var signatureItem;
        var addressItem;
		factory.notification = function notification(notificationData) {
			console.log(notificationData);
			signatureItem=notificationData;
			$state.go('app.signature');
		}

        factory.getSignature = function (){
          return signatureItem;
        }
        
        factory.setAddress = function (item){
          addressItem = item;
        }

        factory.getAddress = function (){
          return addressItem;
        }
        
        var REQUEST_BACKEND_HEADER = {
			'Content-Type':   'application/json; charset=utf-8'
		}

		factory.postRegister = function (item) {
			var req = {
				method: 'POST',
				url: '/register/mobile',
				headers: REQUEST_BACKEND_HEADER,
				data: item
			};
			return $http(req);
		};
        
        factory.postSignature = function (item) {
			var req = {
				method: 'POST',
				url: '/signature',
				headers: REQUEST_BACKEND_HEADER,
				data: item
			};
			return $http(req);
		};



		return factory;



	}


})(window.angular);
