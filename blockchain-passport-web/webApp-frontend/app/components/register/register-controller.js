'use strict';

angular.module('App.Controllers')

.controller('registerController',
	function ($log, RegisterFactory, growl, $state, $scope) {
		$log.debug('registerController loading');
		var self = this;
		self.page = 'register';


		function activate() {
			self.step = 1;
			self.showScanQR = false;
			Webcam.attach('#my_camera');
		}
		activate();

		self.scanQr = function () {
			//self.step = 2; //esto va al succes
			self.showScanQR = true;
		}

		$scope.onSuccess = function (data) {
			console.log(data);
			self.ethereumAddress = data;
			self.step = 2
            console.log(self.step)
		};

		$scope.onError = function (error) {
			console.log(error);
		};

		$scope.onVideoError = function (error) {
			console.log(error);
		};

		self.userDetails = function (item) {
			self.step = 3;
			self.user = item;
			self.user.ethereumAddress = self.ethereumAddress;
			console.log(self.user)
		};

		self.takeSnapshot = function () {
			Webcam.snap(function (data_uri) {
				self.step = 4;
				self.photo = data_uri;
				console.log(data_uri)
			});
		}

		self.registerUser = function () {
            self.user.imageId =RegisterFactory.postPhoto(self.photo)
            self.user.imageHash = self.photo;
            console.log(self.user)
            RegisterFactory.postRegistration(self.user).then(function (result) {
				console.log('succes')
				growl.success("You are registered");
				$state.go('menu');
            }, function (error) {
				growl.error(error.data);
				console.log('Error', error);
            });
			  	
		}



	});
