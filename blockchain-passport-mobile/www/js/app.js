// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material', 'firebase', 'NotificationsService']);

app.run(function ($ionicPlatform, NotificationsService) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
		NotificationsService.getPushNotificationToken();
  
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
	
})

app.config(function ($stateProvider, $urlRouterProvider) {
	var config = {
		//apiKey: "AIzaSyB3ANlViTLKz2aTYM01RzE0g2i-TitGFxs",  // Your Firebase API key
		databaseURL: "https://prova-3cb00.firebaseio.com/"
	};
	firebase.initializeApp(config);
	
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    .state('app.register', {
        url: '/register',
        views: {
            'menuContent': {
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            }
        }
    })

    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/register');
});
