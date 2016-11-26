(function (angular) {
	'use strict';

	angular
		.module('starter.Signature')
		.controller('SignatureCtrl', SignatureCtrl);

	function SignatureCtrl($scope, $stateParams, ionicMaterialInk,NotificationsFactory) {
		//ionic.material.ink.displayEffect();
		ionicMaterialInk.displayEffect();
      
        $scope.pushNotification=JSON.parse(NotificationsFactory.getSignature());
        
        $scope.sign= function(){
            var objToPost={
            "signature":"asdasasfa",
            "requestId": $scope.pushNotification.requestInfo.requestId
            
        }
		NotificationsFactory.postSignature(objToPost).then(function () {
	            $state.go("app.admin")
            })
            
        }
        
		


	}
})(window.angular);