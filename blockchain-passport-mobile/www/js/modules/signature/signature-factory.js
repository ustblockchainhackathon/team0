(function (angular) {
    'use strict';

    angular
        .module('App.SignatureFactory')
        .factory('SignatureFactory', SignatureFactory);

    function SignatureFactory($http,InitConstants) {

        var factory = [];
		    var signatureItem;
        var REQUEST_BACKEND_HEADER ={
            'Content-Type':   'application/json; charset=utf-8'
        }

        factory.postSignature = function (data) {
            var req = {
                method: 'POST',
                url: InitConstants.REST_AUTH_SERVER_BASE_URL + 'signature',
                headers: REQUEST_BACKEND_HEADER,
                data: data
            };
            return $http(req);
        }
		
		factory.rejectSignature = function (data) {
            var req = {
                method: 'POST',
                url: InitConstants.REST_AUTH_SERVER_BASE_URL + 'signature/reject',
                headers: REQUEST_BACKEND_HEADER,
                data: data
            };
            return $http(req);
        }
		
        factory.setSignature = function (item){
          signatureItem = item;
        }

        factory.getSignature = function (){
          return signatureItem;
        }

        return factory;
    }


})(window.angular);
