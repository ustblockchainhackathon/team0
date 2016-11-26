(function (angular) {
	'use strict';

	angular
		.module('App.Factories')
		.factory('RegisterFactory', RegisterFactory);

	function RegisterFactory($http) {
		var factory = [];
		var REQUEST_BACKEND_HEADER = {
			'Content-Type':   'application/json; charset=utf-8'
		}
        var photo;

		factory.postRegistration = function (item) {
			var req = {
				method: 'POST',
				url: '/register/user',
				headers: REQUEST_BACKEND_HEADER,
				data: item
			};
			return $http(req);
		};

		factory.postPhoto=function(item) {
            photo=item;
            return 1234;
        }
        
        factory.getPhoto=function() {
            return photo;
        }

		return factory;
        
	}
})(window.angular);
