'use strict';

angular.module('App.Controllers')

.controller('loginController',
	function ($log, LoginFactory, growl, $state, $cookies,$scope,RegisterFactory) {
		$log.debug('loginController loading');
		var self = this;
		self.page = 'login';

		self.displayDetails=false;

		self.showScanQR=false;

		self.scanQr = function (){
			self.showScanQR=true;
		}
		$scope.qrCodeIsScanned = false;
		$scope.onSuccess = function(data) {

			console.log(data);
			var dataObject={
				"ethereumAddress":data,
				"name": "David",
				"surname":"Belinchon"
			}
			if(!$scope.qrCodeIsScanned){
				$scope.qrCodeIsScanned = true;
				LoginFactory.postAuthentication(dataObject).then(function (result) {
					self.userDetails= result;
					self.photo=RegisterFactory.getPhoto();
					LoginFactory.validateHash(self.userDetails.imageHash).then(function (resultValidate) {
							console.log(resultValidate)
							console.log('succes')
							growl.success("Succeful");
							//display the image and table
							self.displayDetails=true;
						},
						function (response) { // optional
							growl.error(response.data);
						})

				}, function (error) {
					growl.error(error.data);
					console.log('Error', error);
				});
			}
		};

		$scope.onError = function(error) {
			console.log(error);
		};

		$scope.onVideoError = function(error) {
			console.log(error);
		};

	});
