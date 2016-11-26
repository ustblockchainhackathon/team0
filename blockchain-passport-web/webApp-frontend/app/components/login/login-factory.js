
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
			var req = {
				method: 'POST',
				url: '/authenticate',
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
