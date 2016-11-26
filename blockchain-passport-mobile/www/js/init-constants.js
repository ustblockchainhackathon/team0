(function (angular) {
    'use strict';

    angular
        .module('App')
        .constant('InitConstants', {
            'REST_BASE_URL': 'localhost:8100/resources/',
            'REST_AUTH_SERVER_BASE_URL': ''
        });

})(window.angular);
