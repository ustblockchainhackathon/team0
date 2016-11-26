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
			var personalDetails = {};
			personalDetails.name = item.name;
			personalDetails.surname = item.surname;			
			personalDetails.dob = item.dob;			
			personalDetails.ssn = item.ssn;	
			item.personalDetails = personalDetails;
			var req = {
				method: 'POST',
				//url: 'http://localhost:3000/register/user',//local debugging
				url: 'http://gov-server.eu-gb.mybluemix.net/register/user',
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
