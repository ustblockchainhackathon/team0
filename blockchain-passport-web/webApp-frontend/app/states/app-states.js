
//////////////////////////////////////////////////
// The main module configuration section shows  //
// how to define when (redirects) and otherwise //
// (invalid urls) to arrangesite navigation     //
// using ui-router.                             //
//////////////////////////////////////////////////

'use strict';

angular.module('passportPoc')
	.config(
    ['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

				///////////////////////////////
				// 1-Redirects and Otherwise //
				///////////////////////////////

				// Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
				$urlRouterProvider

					.otherwise('/menu');

				$stateProvider

					.state('login', {
						// Use a url of '/' to set a states as the 'index'.
						url: '/login',
						templateUrl: 'components/login/login.html',
						controller: 'loginController as login'
					})
					.state('menu', {
						// Use a url of '/' to set a states as the 'index'.
						url: '/menu',
						templateUrl: 'components/menu/menu.html',
						controller: 'menuController as menu'
					})
					.state('register', {
						// Use a url of '/' to set a states as the 'index'.
						url: '/register',
						templateUrl: 'components/register/register.html',
						controller: 'registerController as register'
					});
            }]);
