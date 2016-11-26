
(function (angular) {
	'use strict';

	angular
		.module('App.Factories')
		.factory('LoginFactory', LoginFactory);

	function LoginFactory($http,$q) {

		var factory = [];
		var REQUEST_BACKEND_HEADER = {
			'Content-Type':   'application/json; charset=utf-8'
		}
        var deferred = $q.defer();

		factory.postAuthentication = function (item) {
			var personalDetails = {};
			personalDetails.name = item.name;
			personalDetails.surname = item.surname;	
			item.personalDetails = personalDetails;
			var req = {
				method: 'POST',
				//url: 'http://localhost:3000/authenticate',//local debugging
				url: 'http://gov-server.eu-gb.mybluemix.net/authenticate',
				headers: REQUEST_BACKEND_HEADER,
				data: item
			};
			return $http(req);
		};

		factory.validateHash = function (item) {
            console.log(item)
			 deferred.resolve(true);
             return deferred.promise;
		};
		return factory;
	}
})(window.angular);
