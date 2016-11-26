(function () {
	'use strict';
	agGrid.initialiseAgGridWithAngular1(angular);
	angular.module('App.Controllers', []);
	angular.module('App.Factories', []);
	angular.module('passportPoc', [
        'appverse.rest',
        'ngAnimate',
        'ui.bootstrap',
        'angularRipple',
        'ui.select',
        'ngSanitize',
        'rzModule',
        'rt.resize',
        'chart.js',
        'xeditable',
        'agGrid',
        'appverse.router',
        'App.Controllers',
        'appverse',
        'ngMdIcons',
        'angular-loading-bar',
		'App.Factories',
		'angular-growl',
		'ngCookies',
		'qrScanner'
    ]).run(function ($log, editableOptions) {
		$log.debug('testAlphaApp run');
		editableOptions.theme = 'bs3';
		$('#menu-toggle').click(function (e) {
			e.preventDefault();
			$('#wrapper').toggleClass('toggled');
		});
	}).config(function (cfpLoadingBarProvider, growlProvider,$cookiesProvider) {
		cfpLoadingBarProvider.includeBar = false;
		growlProvider.globalTimeToLive(3000);
		$cookiesProvider.secure = true;
	});
	AppInit.setConfig({
		environment: {
			'REST_CONFIG': {
				'BaseUrl': '/api',
				'RequestSuffix': ''
			}
		},
		appverseMobile: {},
		mobileBrowser: {}
	});
	angular.module('passportPoc').animation('.fade-in', function () {
		return {
			enter: function (element, done) {
				element.css({
					opacity: 0
				}).animate({
					opacity: 1
				}, 1000, done);
			},
			leave: function (element, done) {
				element.css({
					opacity: 0
				});
				done();
			}
		};
	});
}());
