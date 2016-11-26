(function (angular) {
	'use strict';

	angular
		.module('starter.Register')
		.controller('RegisterCtrl', RegisterCtrl);

	function RegisterCtrl($scope, $stateParams, ionicMaterialInk,NotificationsFactory,$state,NotificationsService) {
		//ionic.material.ink.displayEffect();
		ionicMaterialInk.displayEffect();
        $scope.registerAccount= function(){ 
          var objToPost={
              "ethereumAddress":"0xc30deb0bc575a1335afbbc3af1a2286874f79f95324afcd0ca1a86f2751296fb",
              "registrationToken": NotificationsService.getToken()
          }  
          NotificationsFactory.postRegister(objToPost).then(function () {
				NotificationsFactory.setAddress("0xc30deb0bc575a1335afbbc3af1a2286874f79f95324afcd0ca1a86f2751296fb");
						console.log('succes')
	            $state.go("app.admin")
            });
            
            
        }
        
		
		


	}
})(window.angular);