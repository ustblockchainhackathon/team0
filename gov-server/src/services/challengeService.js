'use strict';

var Q = require('q'),
      promiseMap = require('./promiseMap.js'),
      firebaseService = require('./firebaseService.js'),
      randomChallengeService = require('./randomChallengeService.js');

module.exports = (function init() {
	
	return {
		challengeMobile : function challengeMobile (request) {
			return randomChallengeService.generateRandomString()
			.then(function sendPushNotificationAndWaitForSignature(challengeString) {
				console.log(request.getRequestId() + ' starting challenge for registrationToken '
				    + request.getRegistrationToken() + 'generated random challenge:' + challengeString);
				request.setChallenge(challengeString);
				var deferred = Q.defer();
				promiseMap.registerPromise('C' + request.getRequestId(), deferred, 6000000);
				firebaseService.sendPushNotification(request);
				return deferred.promise;
			}).then(function verifySignature(signature) {
				console.log(request.getRequestId() + " verifying signature " + signature);
				//TODO signature verification
				return true;
			}).then(function afterSignatureVerification(result) {
				console.log(request.getRequestId() + " signature is: " + (result ? "valid" : "invalid"));
				return result;
			});
		}
	};
})();