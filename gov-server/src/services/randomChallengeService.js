'use strict'

const crypto = require('crypto'),
      Q = require('q');

module.exports = (function init() {

	return {
		generateRandomString : function generateRandomString() {
			var deferred = Q.defer();
			Q.fcall(function generateRandomBytes() {
				crypto.randomBytes(48, function (err, buffer) {
					if (err) {
						deferred.reject(err);
					} else {
						deferred.resolve(buffer.toString('hex'));
					}
				});
			})
			return deferred.promise;
		}
	}
})();