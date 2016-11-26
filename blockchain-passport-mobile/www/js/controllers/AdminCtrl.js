(function (angular) {
	'use strict';

	angular
		.module('starter.Admin')
		.controller('AdminCtrl', AdminCtrl);

	function AdminCtrl($scope, $stateParams, ionicMaterialInk,NotificationsFactory) {
		//ionic.material.ink.displayEffect();
		ionicMaterialInk.displayEffect();
      
        $scope.address=NotificationsFactory.getAddress();
		
		


	}
})(window.angular);