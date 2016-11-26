(function (angular) {
	'use strict';

	angular
		.module('starter.Register')
		.controller('RegisterCtrl', RegisterCtrl);

	function RegisterCtrl($scope, $stateParams, ionicMaterialInk,NotificationsFactory,$state) {
		//ionic.material.ink.displayEffect();
		ionicMaterialInk.displayEffect();
        $scope.registerAccount= function(){ 
            NotificationsFactory.postRegister("0xc30deb0bc575a1335afbbc3af1a2286874f79f95324afcd0ca1a86f2751296fb").then(function () {
				NotificationsFactory.setAddress("0xc30deb0bc575a1335afbbc3af1a2286874f79f95324afcd0ca1a86f2751296fb");
						console.log('succes')
	            $state.go("app.admin")
            });
            
            
        }
        
		
		


	}
})(window.angular);