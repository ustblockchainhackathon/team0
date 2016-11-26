(function (angular) {
    'use strict';

    angular
        .module('App.RegisterFactory')
        .factory('RegisterFactory', RegisterFactory);

    function RegisterFactory($http,InitConstants) {

        var factory = [];
		    var REQUEST_BACKEND_HEADER ={
            'Content-Type':   'application/json; charset=utf-8'
        }

        factory.postRegistration = function (data) {
            var req = {
                method: 'POST',
                url: InitConstants.REST_AUTH_SERVER_BASE_URL + 'register/mobile',
                headers: REQUEST_BACKEND_HEADER,
                data: data
            };
            return $http(req);
        }


        return factory;



    }


})(window.angular);
