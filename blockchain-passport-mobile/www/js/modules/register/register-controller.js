(function (angular) {
	'use strict';

	angular
		.module('App.Register')
		.controller('RegisterCtrl', RegisterCtrl);

	function RegisterCtrl($localStorage, $ionicPopup, $timeout, RegisterFactory, $state, $scope, NotificationsService,$cordovaToast) {
		var self = this;

		self.name = "register";
		var ethCrypto = new EthCrypto();
		self.sucessPatternLock = true;
		var completePattern;
		var successPopupItem;
		//self.email = "dsfsdfdfs@dsfsdf.pl";

		function activate() {

		}
		activate();

		var lock = new PatternLock("#patternContainerRegister", {
			onDraw: function (pattern) {
				console.log(pattern)
				$scope.$apply(function () {
					self.sucessPatternLock = false;
				});
				completePattern = pattern;
				lock.disable();
			}
		});

		self.resertPattern = function () {
			self.sucessPatternLock = true;
			lock.reset();
			lock.enable();
		}

		self.successPopup = function () {
			successPopupItem = $ionicPopup.alert({
				title: 'Register Account',
				template: 'Your account is created'
			});
		};

		self.registerAccount = function (email) {
			if (self.createAccountForm.$invalid || self.sucessPatternLock) {
				$cordovaToast.showShortCenter('Please fill it all the fields')
			} else {
				//register push notifications
				//NotificationsService.getPushNotificationToken();
				lock.reset();
				//cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				ActivityIndicator.show('Creating your account. Please wait...')
				//try this timeout in mobile(is for animation button)
				$timeout(function () {
					ethCrypto.createAccount(completePattern.toString()).then(function (data) {
						var parsedData = JSON.parse(data);
						var FCMtoken = NotificationsService.getToken();

						//store in mobile the localdata
						$localStorage.myKey = data;

						//request to the server with address and email
						var item = {
							email: email,
							secondaryAddress: '0x' + parsedData.address,
							registrationToken: FCMtoken
						}

						RegisterFactory.postRegistration(item).then(function (data) {
							ActivityIndicator.hide()
							self.successPopup();
							$state.transitionTo('admin');
						}, function (error) {
							ActivityIndicator.hide()
							console.log('[postRegistration] Error', JSON.stringify(error));
						});

					}).catch(function handleError(error) {
						//your error handling goes here
						console.log('[createAccount] Error' + JSON.stringify(error));
						ActivityIndicator.hide()
					});
				}, 100);
			}

		}

		$scope.$on('$ionicView.enter', function (ev, d) {
			activate();
		});



	}
})(window.angular);
