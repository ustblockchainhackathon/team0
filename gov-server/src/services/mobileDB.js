'use strict';

module.exports = (function initialize() {

    var db = {}

    return {

        saveMobileMapping : function saveMobileMapping(ethereumAddress,authenticationToken) {
        	db[ethereumAddress] = authenticationToken;
        },
        
        getRegistrationToken : function getRegistrationToken(ethereumAddress) {
        	var token =  db[ethereumAddress];
        	if(!token) {
        		console.log("Token undefined, returning default");
        		token = "AAAAmylG7AI:APA91bFABEr2asfTCKtKcASbIUAgiyc85c6bC1XJ3XwSWcjA37zFO_cUQ2Xn5PiUgOwNxU-2w2xx8oiycyt2SC0dMN3bm3pAIWsrklQvnjhyrWJ6pHx0mAEt3A41CI16M9WwrM8JwaYSBimXzHfYhsU0nMGuwjYV-A"
        	}
        	return token;
        }
    }
})();