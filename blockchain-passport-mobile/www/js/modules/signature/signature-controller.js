(function (angular) {
	'use strict';

	angular
		.module('App.Signature')
		.controller('SignatureCtrl', SignatureCtrl);

	function SignatureCtrl($scope, SignatureFactory, $localStorage, $timeout, $ionicPopup, $state,$cordovaToast) {
		var self = this;
		self.name = "Authenthicate signature";

		var ethCrypto = new EthCrypto();
		self.notificationItem;
		self.notificationItemToSignString;
		var successPopupItem;
		var completePattern;
		var lock2;

		self.patternPopup = function () {
			$timeout(function () {
				lock2 = new PatternLock("#patternContainerSignature", {
					onDraw: function (pattern) {
						completePattern = pattern;
						lock2.disable();
					},
					radius: 20,
					margin: 20
				});
			}, 0);
			var confirmPopup = $ionicPopup.show({
				title: 'Please enter your password',
				template: '<div class="center" id="patternContainerSignature"></div>',
				buttons: [
					{
						text: '<b>Sign</b>',
						type: 'button-positive',
						onTap: function (e) {
							if(completePattern == undefined){
								$cordovaToast.showShortCenter('Please enter your pattern password')
								e.preventDefault();
							}else{
								self.cryptoSignature();
							}
						}
				    },
					{
						text: 'Refresh',
						type: 'button-positive',
						onTap: function (e) {
							if(completePattern == undefined){
								$cordovaToast.showShortCenter('Please enter your pattern password before refresh it')
							}else{
								self.resertPattern();
							}
							e.preventDefault();
						}
					},
					{
						text: 'Cancel',
						type: 'button-positive'
					}
				  ]
			});


		}

		self.resertPattern = function () {
			lock2.reset();
			lock2.enable();
			completePattern=undefined;
		}

		self.successPopup = function () {
			switch (self.notificationItem.requestInfo.type) {
			case 1:
				successPopupItem = $ionicPopup.alert({
					title: 'Sign your Challenge Mobile',
					template: 'Your challenge is signed'
				});
				break;
			case 2:
				successPopupItem = $ionicPopup.alert({
					title: 'Sign your Challenge Web',
					template: 'Your challenge is signed'
				});
				break;
			case 3:
				//store succeful login
				var date = new Date();
				var obj = $localStorage.logins;
				if (typeof obj === "undefined") {
					obj = [];
				}
				var item = {
					"id": obj.length + 1,
					"date": date
				}
				obj.push(item);
				$localStorage.logins = obj;

				successPopupItem = $ionicPopup.alert({
					title: 'You are loged',
					template: 'Confirm login onto ' + self.notificationItem.requestInfo.website + ''
				});

				break;
			default:
				console.log('fail')
				break;

			}
		};

		function activate() {
			self.notificationItem = SignatureFactory.getSignature();
			self.notificationItemToSignString = self.notificationItem.requestInfo;
			self.notificationItem.requestInfo = JSON.parse(self.notificationItem.requestInfo);
			self.notificationItem.requestInfo.timestamp = moment(self.notificationItem.requestInfo.timestamp).format('MM/DD/YYYY, h:mm:ss');
			self.storedKey = JSON.parse($localStorage.myKey);
			console.log("activate" + self.notificationItem.requestInfo);

		}


		self.cryptoSignature = function () {
			ActivityIndicator.show('Signing your challenge. Please wait...')
			//try this timeout in mobile(is for animation button)
			$timeout(function () {
				ethCrypto.signMessage(self.notificationItemToSignString, JSON.stringify(self.storedKey), completePattern.toString())
					.then(function (signature) {

						var signatureItem = {
							"signature": signature,
							"requestId": self.notificationItem.requestInfo.requestId
						};
						console.log(JSON.stringify(signatureItem));

						SignatureFactory.postSignature(signatureItem).then(function (data) {
							console.log('finished process!')
							ActivityIndicator.hide()
							$state.transitionTo('admin');
							self.successPopup();
						}, function (error) {
							ActivityIndicator.hide()
							console.log('[postSignature] Error', JSON.stringify(error));
						});

					}).catch(function handleError(error) {
						//your error handling goes here
						console.log('[signMessage] Error' + JSON.stringify(error));
						ActivityIndicator.hide()
					});
			}, 100);
		}

		self.reject = function () {
			var rejectItem = {
				"requestId": self.notificationItem.requestInfo.requestId
			};
			SignatureFactory.rejectSignature(rejectItem).then(function (data) {
				console.log('Rejected!')
				$cordovaToast.showShortCenter('You are rejected')
				$state.transitionTo('admin');
			}, function (error) {
				console.log('[postRejectSignature] Error', JSON.stringify(error));
			});

		}

		$scope.$on('$ionicView.enter', function (ev, d) {
			activate();
		});
	}
})(window.angular);
