'use strict';
angular.module('App')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        // Global Position - Dashboard
            .state('register', {
                url: '/register',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/register/register.html',
                        controller: 'RegisterCtrl as register',
						resolve: {
						   security: function($localStorage,$state,$timeout){
							   if($localStorage.myKey!=null){
								   $timeout(function () {
								  		$state.go('admin');
								   }, 0);
							   }
						   }
						}
                    }
                }
            })
            .state('admin', {
                url: '/admin',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/admin/admin.html',
                        controller: 'AdminCtrl as admin'
                    }
                }
            })
			.state('signature', {
                url: '/signature',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/signature/signature.html',
                        controller: 'SignatureCtrl as signature'
                    }
                }
            });

        // If none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/register');
    });
