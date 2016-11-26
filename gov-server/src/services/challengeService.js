'use strict';

const Q = require('q'),
      promiseMap = require('../maps/promiseMap.js'),
      firebaseService = require('./firebaseService.js'),
      randomChallengeService = require('./randomChallengeService.js');

module.exports = (function init() {
	
	return {
		challengeMobile : function challengeMobile (request) {
			return randomChallengeService.generateRandomString()
			.then(function sendPushNotificationAndWaitForSignature(challengeString) {
				log.info(request.getRequestId() + ' starting challenge for registrationToken '
				    + request.getRegistrationToken() + 'generated random challenge:' + challengeString);
				request.setChallenge(challengeString);
				var deferred = Q.defer();
				promiseMap.registerPromise('C' + request.getRequestId(), deferred, 6000000);
				firebaseService.sendPushNotification(request);
				return deferred.promise;
			}).then(function verifySignature(signature) {
				log.info(request.getRequestId() + " verifying signature " + signature);
				//TODO signature verification
				return true;
			}).then(function afterSignatureVerification(result) {
				log.info(request.getRequestId() + " signature is: " + (result ? "valid" : "invalid"));
				if (result) {
					promiseMap.resolvePromise('M' + request.getRequestId());
				} else {
					promiseMap.rejectPromise('M' + request.getRequestId(), new Error("Invalid signature!"));
				}
				return result;
			});
		}
	};
})();