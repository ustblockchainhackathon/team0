(function (angular) {
	'use strict';

	angular
		.module('App.Admin')
		.controller('AdminCtrl', AdminCtrl);

	function AdminCtrl($scope,$localStorage,$ionicPopup,$cordovaToast,$state) {
		var self = this;

		self.tab = "address";

		function activate() {
			self.localKey = JSON.parse($localStorage.myKey);
			self.logins = $localStorage.logins;
		}

		self.changeTab = function (tab) {
			self.tab = tab;
		}

		self.removeKeys = function () {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Remove Key',
				template: 'Are you sure you want remove the key?'
			});

			confirmPopup.then(function (res) {
				if (res) {
					console.log('You are sure');
					$localStorage.myKey = null;
					$cordovaToast.showShortCenter('Your key are removed')
					$state.transitionTo('register');
				} else {
					console.log('You are not sure');
				}
			});
			
		}
		self.removeLogins = function () {
			$localStorage.logins = null;
		}
		
		$scope.$on('$ionicView.enter', function (ev, d) {
			activate();
		});
	}
})(window.angular);